import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from "../../../environments/environment";
import {Gegner, Kampf, KampfService} from "../kampf.service";
import {GruppenService} from "../../shared/gruppen.service";
import {first} from "rxjs/operators";
import {KampfRenderComponent} from "../kampf-render/kampf-render.component";

@Component({
  selector: 'app-kampf-routing',
  templateUrl: './kampf-routing.component.html',
  styleUrls: ['./kampf-routing.component.css']
})
export class KampfRoutingComponent implements OnInit, OnDestroy {

  constructor(private kampfservice: KampfService, private gruppenService: GruppenService) {
  }

  public kampf;

  private stompClient;

  private onDestroySub;
  private onGroupChangeSub;
  private onKampfChangeSubs;

  @ViewChild(KampfRenderComponent) private component: KampfRenderComponent;

  ngOnInit() {
    const ws = new SockJS(environment.ws);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {


      this.onDestroySub = this.gruppenService.getCurrentGroup()
        .subscribe(gruppe => {

          if (this.onGroupChangeSub) {
            this.onGroupChangeSub.unsubscribe();
          }
          this.onGroupChangeSub = this.stompClient.subscribe(`/kampf/gruppe/${gruppe.id}`, message => {
            const kampf = JSON.parse(message.body);
            this.setKampf(kampf);
          });
          this.kampfservice.getKampfForGruppe(gruppe.id)
            .subscribe(kampf => {
              if (kampf) {

                this.setKampf(kampf);
              } else {
                this.kampf = null;
              }
            });
        });
    });

  }

  private setKampf(kampf: Kampf) {
    if (this.onKampfChangeSubs) {
      this.onKampfChangeSubs.forEach(entry => entry.unsubscribe());
    }
    this.onKampfChangeSubs = [];
    this.kampf = kampf;
    this.kampf.readonly = true;
    this.onKampfChangeSubs.push(this.stompClient.subscribe(`/kampf/${kampf.id}/teilnehmer/position`, message => {
      const body = JSON.parse(message.body);
      this.component.teilehmerChange(body);
    }));
    this.onKampfChangeSubs.push(this.stompClient.subscribe(`/kampf/${kampf.id}/scale`, message => {
      const scale = message.body;
      this.component.scaleTo(scale);
    }));

    this.onKampfChangeSubs.push(this.stompClient.subscribe(`/kampf/${kampf.id}/image`, message => {
      const image = message.body;
      this.component.setImage(image);
    }));

    this.onKampfChangeSubs.push(this.stompClient.subscribe(`/kampf/${kampf.id}/component/add`, message => {
      this.component.addComponent(JSON.parse(message.body));
    }));

    this.onKampfChangeSubs.push(this.stompClient.subscribe(`/kampf/${kampf.id}/component/update`, message => {
      this.component.onComponentChange(JSON.parse(message.body));
    }));


  }

  public gegnerChange(gegner: Gegner) {
    this.kampfservice.updateGegnerPosition(this.kampf.id, gegner)
      .subscribe();
  }


  ngOnDestroy(): void {
    if (this.onGroupChangeSub) {
      this.onGroupChangeSub.unsubscribe();
    }
    if (this.onDestroySub) {
      this.onDestroySub.unsubscribe();
    }
    if (this.onKampfChangeSubs) {
      this.onKampfChangeSubs.forEach(entry => entry.unsubscribe());
    }
  }


}
