import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Gegner, Kampf, KampfComponent, UpdateTeilnehmerPosition} from "../kampf.service";
import {environment} from "../../../environments/environment";

export const HIDE_CIRCLE = 'hide-circle';

@Component({
  selector: 'app-kampf-render',
  templateUrl: './kampf-render.component.html',
  styleUrls: ['./kampf-render.component.css']
})
export class KampfRenderComponent implements OnChanges {


  @Input() public kampf: Kampf;

  @Output() public teilnehmerChange = new EventEmitter<Gegner>();


  @Output() public componentChange = new EventEmitter<KampfComponent>();

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

    this.backgroundlayer = new Konva.Layer();

    this.playerLayer = new Konva.Layer();
    this.stage.add(this.backgroundlayer);
    this.stage.add(this.playerLayer);
   this.backgroundlayer.draw();
    const image = environment.rest + "assets/"  + this.kampf.image;
    this.addImage(image, () => {});

    this.setKampf(this.kampf);

    this.playerLayer.draw();

  }

  public teilehmerChange(body: UpdateTeilnehmerPosition) {

    const gegner = this.kampf.gegner.find(entry => entry.id === body.gegner);

    gegner.konva.absolutePosition({x: body.x, y: body.y});
    gegner.konva.draw();
    this.playerLayer.draw();
  }

  public onComponentChange(component: KampfComponent) {

    const comp = this.kampf.components.find(entry => entry.id === component.id);


    comp.konva.absolutePosition({x: component.x, y: component.y});
    comp.konva.draw();
    this.playerLayer.draw();
  }



  private setKampf(kampf: Kampf) {
    this.kampf = kampf;

    kampf.gegner.forEach(gegner => {
      this.addGegnerIcon(gegner);
    });

    kampf.components.forEach(entry => this.renderComponent(entry));

  }

  public addComponent(component: KampfComponent) {
    component.id = this.kampf.components.length;
    this.kampf.components.push(component);
    this.renderComponent(component);
  }

  private renderComponent(component: KampfComponent) {
    if (component.type === HIDE_CIRCLE) {
      let circle;
      if (this.kampf.readonly) {
        circle = new Konva.Circle({
          x: component.x, y: component.y,
          radius: component.parameter.radius + component.parameter.vision,
          stroke: 'black',
        });
        circle.strokeWidth(component.parameter.radius * 2);
      } else {
        circle = new Konva.Circle({
          x: component.x, y: component.y,
          radius: component.parameter.vision,
          stroke: 'black',
          strokeWidth: 1
        });
        circle.draggable(true);

        circle.on('dragend', () => {
          component.x = circle.attrs.x;
          component.y = circle.attrs.y;
          this.componentChange.next(component);
        });


      }
      component.konva = circle;
      this.playerLayer.add(circle);
      this.playerLayer.draw();
    }
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
      this.teilnehmerChange.next(gegner);
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
