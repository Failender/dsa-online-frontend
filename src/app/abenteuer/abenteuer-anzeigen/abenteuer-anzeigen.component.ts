import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {KampagnenService} from "../../kampagnen/kampagnen.service";
import {AbenteuerDto, AbenteuerService} from "../abenteuer.service";
import {flatMap} from "rxjs/operators";
import {RoutingService} from "../../shared/routing.service";

@Component({
  selector: 'app-abenteuer-anzeigen',
  templateUrl: './abenteuer-anzeigen.component.html',
  styleUrls: ['./abenteuer-anzeigen.component.css']
})
export class AbenteuerAnzeigenComponent implements OnInit {

  public abenteuer: AbenteuerDto;

  public addSeGruppeid: number = null;
  public addApGruppeid: number = null;

  constructor(private activatedRoute: ActivatedRoute, private abenteuerService: AbenteuerService, private router: RoutingService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => this.loadAbenteuer(data.id))
  }

  back() {
    this.router.navigateByUrl("abenteuer")
  }

  private loadAbenteuer(id) {
    this.abenteuerService.getAbenteuer(id)
      .subscribe(data => this.abenteuer = data);
  }

  backToKampagne() {
    this.router.navigateByUrl("kampagne/" + this.abenteuer.kampagneId);
  }

  backToCreate() {
    this.router.navigateByUrl("administration/abenteuer")
  }

  onAddSeDialogClose(reload: boolean) {
    if (reload) {
      this.loadAbenteuer(this.abenteuer.id)
    }
    this.addSeGruppeid = null;
  }

  onAddApDialogClose(reload: boolean) {
    if (reload) {
      this.loadAbenteuer(this.abenteuer.id)
    }
    this.addApGruppeid = null;
  }

}
