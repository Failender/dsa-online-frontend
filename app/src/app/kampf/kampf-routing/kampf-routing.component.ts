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

  @ViewChild(KampfRenderComponent) private component: KampfRenderComponent;

  ngOnInit() {
    const ws = new SockJS(environment.ws);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {

      this.gruppenService.getCurrentGroup().pipe(first())
        .subscribe(gruppe => {
          this.kampfservice.getKampfForGruppe(gruppe.id)
            .subscribe(kampf => {
              if (kampf) {

                this.setKampf(kampf);
              } else {
                this.kampfservice.startKampf(gruppe.id)
                  .subscribe(response => {
                    this.setKampf(response);
                  });
              }
            });
        });
    });

  }

  private setKampf(kampf: Kampf) {
    this.kampf = kampf;
    this.stompClient.subscribe(`/kampf/${kampf.id}/teilnehmer/position`, message => {
      const body = JSON.parse(message.body);
      this.teilnehmerChange(body);
    });
    this.stompClient.subscribe(`/kampf/${kampf.id}/scale`, message => {
      const scale = message.body;
      console.debug('SCALING TO', scale);
      this.component.scaleTo(scale);
      //this.teilnehmerChange(body);
    });

    this.stompClient.subscribe(`/kampf/${kampf.id}/image`, message => {
      const image = message.body;
      this.component.setImage(image);
    });
  }

  public gegnerChange(gegner: Gegner) {
    this.kampfservice.updateGegnerPosition(this.kampf.id, gegner)
      .subscribe();
  }


}
