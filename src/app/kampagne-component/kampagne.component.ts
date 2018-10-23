import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {KampagnenService} from "../kampagnen/kampagnen.service";
import {flatMap} from "rxjs/operators";
import {GruppenService} from "../shared/gruppen.service";
import {AbenteuerService} from "../abenteuer/abenteuer.service";

@Component({
  selector: 'app-kampagne',
  templateUrl: './kampagne-component.html',
  styleUrls: ['./kampagne-component.css']
})
export class KampagneComponent implements OnInit {

  public kampagne;
  public canEdit = false;
  public abenteuer = [];

  constructor(private activatedRoute: ActivatedRoute, private kampagnenService: KampagnenService, private gruppenService: GruppenService,
              private abenteuerService: AbenteuerService) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(flatMap(data => this.kampagnenService.getKampagne(data.id)))
      .subscribe(data => {
        this.kampagne = data;
        this.onKampagneLoaded();
      });
  }

  private onKampagneLoaded() {
    this.canEdit = this.gruppenService.hasEditRight(this.kampagne.gruppeId);

    this.abenteuerService.getAbenteuerForKampagne(this.kampagne.id)
      .subscribe(data => this.abenteuer = data);
  }

}
