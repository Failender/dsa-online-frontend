import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-kampage-routing',
  templateUrl: './kampage-routing.component.html',
  styleUrls: ['./kampage-routing.component.css']
})
export class KampageRoutingComponent implements OnInit {


  public kampagne;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.pipe()
      .subscribe(data => this.kampagne = data.id);
  }

  ngOnInit() {
  }

}
