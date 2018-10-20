import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {KampagnenService} from "../kampagnen/kampagnen.service";
import {flatMap} from "rxjs/operators";

@Component({
  selector: 'app-kampagne',
  templateUrl: './kampagne-component.html',
  styleUrls: ['./kampagne-component.css']
})
export class KampagneComponent implements OnInit {

  public kampagne;

  constructor(private activatedRoute: ActivatedRoute, private kampagnenService: KampagnenService) { }

  ngOnInit() {
    this.activatedRoute.params.pipe(flatMap(data => this.kampagnenService.getKampagne(data.id)))
      .subscribe(data => this.kampagne = data);
  }

}
