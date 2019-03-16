import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Asset} from "../../shared/abenteuer/asset.service";
import {Kampf, KampfComponent, KampfService} from "../kampf.service";
import {GruppeInfo, GruppenService} from "../../shared/gruppen.service";
import {HIDE_CIRCLE, KampfRenderComponent} from "../kampf-render/kampf-render.component";

@Component({
  selector: 'app-kampf-erstellen',
  templateUrl: './kampf-erstellen.component.html',
  styleUrls: ['./kampf-erstellen.component.css']
})
export class KampfErstellenComponent implements OnInit, OnDestroy {


  public kampf: Kampf
  public teilnehmerChange;

  private published = false;

  @ViewChild(KampfRenderComponent) private kampfRender: KampfRenderComponent;

  public sub;
  public gruppe: GruppeInfo;
  constructor(private gruppenService: GruppenService, private kampfService: KampfService) { }

  ngOnInit() {
    this.sub = this.gruppenService.getCurrentGroup()
      .subscribe(gruppe => {
        this.gruppe = gruppe;
      });
  }

  onAssetSelection(asset: Asset) {
    this.published = false;
    if (asset) {
      this.kampf = {
        gegner: [],
        gruppe: this.gruppe.id,
        image: asset.filename,
        components: []
      };

    } else {
      this.kampf = undefined;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public kreis() {
    if (this.kampf) {
      const component: KampfComponent = {
       type: HIDE_CIRCLE,
        x: 300,
        y: 300,
       parameter: {
         radius: 500,
         vision: 50
       }
      };

      if (this.published) {
        this.kampfService.addComponent(this.kampf.id, component).subscribe();
      } else {

      }
      this.kampfRender.addComponent(component);
    }
  }

  public publish() {
    this.published = true;
    this.kampfService.startKampf(this.gruppe.id, this.kampf)
      .subscribe(data => this.kampf.id = data.id);
  }

  onComponentChange(component: KampfComponent) {
    this.kampfService.updateComponent(this.kampf.id, component)
      .subscribe();
  }

}
