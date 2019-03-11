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

  ngOnInit() {
    const stage = new Konva.Stage({
      container: 'konvas-container',
      width: 500,
      height: 500
    })

    this.backgroundlayer = new Konva.Layer();

    this.playerLayer = new Konva.Layer();
// add the layer to the stage
    stage.add(this.backgroundlayer);
    stage.add(this.playerLayer);
// draw the image
    this.backgroundlayer.draw();
    this.addImage(stage.width(), stage.height(),
      'https://preview.redd.it/dpakjvmefdl21.jpg?width=960&crop=smart&auto=webp&s=aea57549e5e93b2e689f95d3cecd7814b370875d', () => {
        this.addIcon();
      });


  }

  private addIcon() {

    const circle = new Konva.Circle({
      x: 200,
      y: 200,
      radius: 80,
      stroke:'red'
    });

    const image = new Image();
    image.onload = () => {
      circle.fillPatternOffset({x:50, y:70})
      circle.fillPatternImage(image);
      circle.scale({x:0.2, y:0.2})
      circle.draw();
    }
    image.src = "https://cdn2.iconfinder.com/data/icons/fire-fighting-glyph/64/44_fire-axe-fighting-128.png";
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
      if(callback) {
        callback();
      }
    }
    image.src = src;
  }



}


declare var Konva;
