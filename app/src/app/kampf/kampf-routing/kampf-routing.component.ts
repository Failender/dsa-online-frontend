import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from "../../../environments/environment";
import {Gegner, Kampf, KampfService} from "../kampf.service";
import {GruppenService} from "../../shared/gruppen.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-kampf-routing',
  templateUrl: './kampf-routing.component.html',
  styleUrls: ['./kampf-routing.component.css']
})
export class KampfRoutingComponent implements OnInit {

  constructor(private kampfservice: KampfService, private gruppenService: GruppenService) { }

  private backgroundlayer;

  private playerLayer;
  private stage;
  
  private kampf;

  private stompClient;

  ngOnInit() {
    const ws = new SockJS(environment.ws);
    this.stompClient = Stomp.over(ws);
    this.stage = new Konva.Stage({
      container: 'konvas-container',
      width: 958,
      height: 958
    });
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


    this.backgroundlayer = new Konva.Layer();

    this.playerLayer = new Konva.Layer();
// add the layer to the stage
    this.stage.add(this.backgroundlayer);
    this.stage.add(this.playerLayer);
// draw the image
    this.backgroundlayer.draw();
    this.addImage(this.stage.width(), this.stage.height(),
      'https://preview.redd.it/dpakjvmefdl21.jpg?width=960&crop=smart&auto=webp&s=aea57549e5e93b2e689f95d3cecd7814b370875d', () => {});


  }

  private setKampf(kampf: Kampf) {
    this.kampf = kampf;

    kampf.gegner.forEach(gegner => {
      this.addGegnerIcon(gegner);
    })
    // this.addIcon(200, 200, 'axe');
    // this.addIcon(300, 200, 'bow');
    // this.addIcon(300, 300, 'mage');
    // this.addIcon(250, 200, 'dualsword');


    this.stompClient.subscribe(`/kampf/${kampf.id}/teilnehmer/position`, message => {
      const body = JSON.parse(message.body);

      const gegner = this.kampf.gegner.find(entry => entry.id === body.gegner);

      gegner.konva.absolutePosition({x: body.x, y: body.y});
      gegner.konva.draw();
      this.playerLayer.draw();

    });
  }

  private addGegnerIcon(gegner: Gegner) {

    const group = new Konva.Group({
      x: gegner.x, y: gegner.y,
    });
    group.draggable(!this.kampf.readonly);
    const background = new Konva.Circle({
      x: 0, y: 0,
      radius: 16,

     stroke: gegner.ally ? 'blue' : 'red',
    });
    const fillY = +16 - 32 * gegner.hpPercentage;
    background.fillLinearGradientColorStops([0, 'red', 0, 'green'])
    background.fillLinearGradientStartPoint({x: 8, y: fillY});
    background.fillLinearGradientEndPoint({x: 8, y: 16});
    gegner.konva = group;
    group.add(background);

    const image = new Image();
    image.onload = () => {
      const foreground = new Konva.Circle({
        x: 0, y: 0, radius: 16
      })
      foreground.fillPatternOffset({x: 16, y: 16})
      foreground.fillPatternImage(image);
      group.add(foreground)

      group.draw();
    }

    group.on('dragend', () => {
      gegner.x = group.attrs.x;
      gegner.y = group.attrs.y;
      this.kampfservice.updateGegnerPosition(this.kampf.id, gegner)
        .subscribe();
    })
    image.src = `assets/icons/${gegner.icon}.png`;
    this.playerLayer.add(group);
  }

  private addImage(width, height, src, callback?) {
    const image = new Image();
    image.onload = () => {
      const element = new Konva.Image({
        width: width,
        height: height,
        x: 0,
        y: 0,
        image: image
      })
      this.backgroundlayer.add(element);
      element.fillRadialGradientEndPointY(20);
      this.backgroundlayer.draw();
      if (callback) {
        callback();
      }
    }
    image.src = src;
  }

  scaleUp() {
    this.stage.height(this.stage.height() * 2);
    this.stage.width(this.stage.width() * 2);
    this.stage.scale({x: 2, y: 2});
    this.stage.draw();
  }

  scaleDown() {
    this.stage.height(this.stage.height() * 0.5);
    this.stage.width(this.stage.width() * 0.5);

    this.stage.scale({x: 0.5, y: 0.5});
    this.stage.draw();
  }



}


declare var Konva;
