import {Component, OnInit, ViewChild} from '@angular/core';
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
export class KampfRoutingComponent implements OnInit {

  constructor(private kampfservice: KampfService, private gruppenService: GruppenService) {
  }

  private kampf;

  public teilnehmerChange;
  private stompClient;

  private onDestroySub;
  private onGroupChangeSub;
  private onKampfChangeSubs;

  @ViewChild(KampfRenderComponent) private component: KampfRenderComponent;

  ngOnInit() {
    const ws = new SockJS(environment.ws);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {


      this.onDestroySub = this.gruppenService.getCurrentGroup().pipe(first())
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
                // this.kampfservice.startKampf(gruppe.id)
                //   .subscribe(response => {
                //     this.setKampf(response);
                //   });
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
    this.onKampfChangeSubs.push(this.stompClient.subscribe(`/kampf/${kampf.id}/teilnehmer/position`, message => {
      const body = JSON.parse(message.body);
      this.teilnehmerChange(body);
    }));
    this.onKampfChangeSubs.push(this.stompClient.subscribe(`/kampf/${kampf.id}/scale`, message => {
      const scale = message.body;
      this.component.scaleTo(scale);
    }));

    this.onKampfChangeSubs.push(this.stompClient.subscribe(`/kampf/${kampf.id}/image`, message => {
      const image = message.body;
      this.component.setImage(image);
    }));
  }

  public gegnerChange(gegner: Gegner) {
    this.kampfservice.updateGegnerPosition(this.kampf.id, gegner)
      .subscribe();
  }


}
