import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Gegner, Kampf, UpdateTeilnehmerPosition} from "../kampf.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-kampf-render',
  templateUrl: './kampf-render.component.html',
  styleUrls: ['./kampf-render.component.css']
})
export class KampfRenderComponent implements OnChanges {


  @Input() public kampf: Kampf;

  @Output() public teilnehmerChangeOut = new EventEmitter<Gegner>();
  @Output() public teilnehmerChangeIn = new EventEmitter<any>();

  private backgroundlayer;
  private playerLayer;
  private stage;


  private backgroundImage;
  private scaleFactor = 1.5;
  private currentScale = 1;

  ngOnChanges(changes: SimpleChanges) {

    this.stage = new Konva.Stage({
      container: 'konvas-container',
      width: window.innerWidth,
      height: window.innerHeight
    });



    this.teilnehmerChangeIn.next(this.teilehmerChange.bind(this));
    this.backgroundlayer = new Konva.Layer();

    this.playerLayer = new Konva.Layer();
    this.stage.add(this.backgroundlayer);
    this.stage.add(this.playerLayer);
   this.backgroundlayer.draw();
    const image = environment.rest + "assets/"  + this.kampf.image;
    this.addImage(image, () => {});

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

  private addImage(src, callback?) {
    const image = new Image();
    image.onload = () => {
      const element = new Konva.Image({
        width: image.width,
        height: image.height,
        x: 0,
        y: 0,
        image: image
      })
      this.backgroundImage = element;
      element.draggable(true);
      this.backgroundlayer.add(element);
      element.fillRadialGradientEndPointY(20);
      this.backgroundlayer.draw();
      if (callback) {
        callback();
      }
    }
    image.src = src;
  }

  public scaleTo(scale: number) {
    const factor = scale / this.currentScale;
    this.stage.height(this.stage.height() * factor);
    this.stage.width(this.stage.width() * factor);
    this.stage.scale({x: scale, y: scale});

  }

  public setImage(image: string) {
    console.error(image)
  }

  scaleUp() {
    this.currentScale *= this.scaleFactor;
    this.stage.height(this.stage.height() * this.scaleFactor);
    this.stage.width(this.stage.width() * this.scaleFactor);
    this.stage.scale({x: this.currentScale, y: this.currentScale});
    this.stage.draw();
  }

  scaleDown() {
    const scale = 1 / this.scaleFactor;
    this.currentScale *= scale;
    this.stage.height(this.stage.height() * scale);
    this.stage.width(this.stage.width() * scale);
    this.stage.scale({x: this.currentScale, y: 1 / this.currentScale});
    this.stage.draw();
  }



}


declare var Konva;
