import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {KampagnenService} from "../../kampagnen/kampagnen.service";
import {AbenteuerService} from "../abenteuer.service";
import {flatMap} from "rxjs/operators";
import {RoutingService} from "../../shared/routing.service";

@Component({
  selector: 'app-abenteuer-anzeigen',
  templateUrl: './abenteuer-anzeigen.component.html',
  styleUrls: ['./abenteuer-anzeigen.component.css']
})
export class AbenteuerAnzeigenComponent implements OnInit {

  public abenteuer: any;

  constructor(private activatedRoute: ActivatedRoute, private abenteuerService: AbenteuerService, private router: RoutingService) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(flatMap(data => this.abenteuerService.getAbenteuer(data.id)))
      .subscribe(data => this.abenteuer = data);
  }

  back() {
    this.router.navigateByUrl("abenteuer")
  }

  backToCreate() {
    this.router.navigateByUrl("administration/abenteuer")
  }

}
