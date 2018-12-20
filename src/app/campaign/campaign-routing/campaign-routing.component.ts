import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-kampage-routing',
  templateUrl: './campaign-routing.component.html',
  styleUrls: ['./campaign-routing.component.css']
})
export class CampaignRoutingComponent implements OnInit {


  public kampagne;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.pipe()
      .subscribe(data => this.kampagne = data.id);
  }

  ngOnInit() {
  }

}
