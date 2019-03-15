import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Gegner, Kampf, UpdateTeilnehmerPosition} from "../kampf.service";
import {environment} from "../../../environments/environment";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-kampf-render',
  templateUrl: './kampf-render.component.html',
  styleUrls: ['./kampf-render.component.css']
})
export class KampfRenderComponent implements OnInit {


  @Input() public kampf: Kampf;

  @Output() public teilnehmerChangeOut = new EventEmitter<Gegner>();
  @Output() public teilnehmerChangeIn = new EventEmitter<any>();

  private backgroundlayer;
  private playerLayer;
  private stage;

  ngOnInit() {

    this.stage = new Konva.Stage({
      container: 'konvas-container',
      width: 958,
      height: 958
    });



    this.teilnehmerChangeIn.next(this.teilehmerChange.bind(this));
    this.backgroundlayer = new Konva.Layer();

    this.playerLayer = new Konva.Layer();
// add the layer to the stage
    this.stage.add(this.backgroundlayer);
    this.stage.add(this.playerLayer);
// draw the image
    this.backgroundlayer.draw();
    const image = environment.rest + "assets/"  + this.kampf.image;
    console.debug(image);
    this.addImage(this.stage.width(), this.stage.height(),
      image, () => {});

    this.setKampf(this.kampf);

  }

  private teilehmerChange(body: UpdateTeilnehmerPosition) {

    const gegner = this.kampf.gegner.find(entry => entry.id === body.gegner);

    gegner.konva.absolutePosition({x: body.x, y: body.y});
    gegner.konva.draw();
    this.playerLayer.draw();
  }

  private setKampf(kampf: Kampf) {
    this.kampf = kampf;

    kampf.gegner.forEach(gegner => {
      this.addGegnerIcon(gegner);
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
      this.teilnehmerChangeOut.next(gegner);
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
