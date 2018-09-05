import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HeldenService} from '../../meine-helden/helden.service';

interface DifferenceInfo {
  heldname: string;
  from: number;
  to: number;
}
@Component({
  selector: 'app-held-vergleich',
  templateUrl: './held-vergleich.component.html',
  styleUrls: ['./held-vergleich.component.css']
})
export class HeldVergleichComponent implements OnInit {


  public differenceInfo: DifferenceInfo = null;

  public data: any;

  constructor(private route: ActivatedRoute, private heldenService: HeldenService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.heldenService.getHeldDifferences(params.id, params.from, params.to)
        .subscribe(data => {
          this.data = data;
          this.differenceInfo = {
            heldname: data.heldname,
            from: params.from,
            to: params.to
          };
        });
    });
  }

}
