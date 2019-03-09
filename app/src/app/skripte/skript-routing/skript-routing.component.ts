import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SkriptService} from "../skript.service";

@Component({
  selector: 'app-skript-routing',
  templateUrl: './skript-routing.component.html',
  styleUrls: ['./skript-routing.component.css']
})
export class SkriptRoutingComponent implements OnInit {

  public result;
  public loading = true;

  constructor(private route: ActivatedRoute, private skriptService: SkriptService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.skriptService.execute(data.id)
        .subscribe(result => {
          this.result = result;
          this.loading = false;
        });
    });
  }

}
