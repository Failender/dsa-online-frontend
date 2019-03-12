import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-kampf-routing',
  templateUrl: './kampf-routing.component.html',
  styleUrls: ['./kampf-routing.component.css']
})
export class KampfRoutingComponent implements OnInit {

  constructor() { }

  private backgroundlayer;

  private playerLayer;
  private stage;

  ngOnInit() {
    this.stage = new Konva.Stage({
      container: 'konvas-container',
      width: 958,
      height: 958
    })

    this.backgroundlayer = new Konva.Layer();

    this.playerLayer = new Konva.Layer();
// add the layer to the stage
    this.stage.add(this.backgroundlayer);
    this.stage.add(this.playerLayer);
// draw the image
    this.backgroundlayer.draw();
    this.addImage(this.stage.width(), this.stage.height(),
      'https://preview.redd.it/dpakjvmefdl21.jpg?width=960&crop=smart&auto=webp&s=aea57549e5e93b2e689f95d3cecd7814b370875d', () => {
        this.addIcon(200, 200, 'axe');
        this.addIcon(300, 200, 'bow');
        this.addIcon(300, 300, 'mage');
        this.addIcon(250, 200, 'dualsword');
      });


  }

  private addIcon(x, y, type: string) {

    const circle = new Konva.Circle({
      x, y,
      radius: 16,
      stroke: 'red',
      draggable: true
    });

    const image = new Image();
    image.onload = () => {
      circle.fillPatternOffset({x: 16, y: 16})
      circle.fillPatternImage(image);

      circle.draw();
    }

    circle.on('dragend', () => {
      console.debug(circle, circle.attrs.x, circle.attrs.y);
    })
    image.src = `assets/icons/${type}.png`;
    this.playerLayer.add(circle);
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
