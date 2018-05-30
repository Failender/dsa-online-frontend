import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeldenService} from '../../meine-helden/helden.service';

@Component({
  selector: 'app-held-vergleich',
  templateUrl: './held-vergleich.component.html',
  styleUrls: ['./held-vergleich.component.css']
})
export class HeldVergleichComponent implements OnInit {


  public data: any;

  constructor(private route: ActivatedRoute, private heldenService: HeldenService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.heldenService.compareHeldVersionen(params.id, params.from, params.to)
        .subscribe(data => this.data = data);
    });
  }

}
