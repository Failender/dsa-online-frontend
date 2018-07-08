import { Component, OnInit } from '@angular/core';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {HeldenService} from '../../meine-helden/helden.service';
import {RoutingService} from "../../shared/routing.service";
import {SortEvent} from "primeng/api";

@Component({
  selector: 'app-held-ereignisse',
  templateUrl: './held-ereignisse.component.html',
  styleUrls: ['./held-ereignisse.component.css']
})
export class HeldEreignisseComponent extends HeldenComponent {

  constructor(heldenService: HeldenService, router: RoutingService) {
    super(heldenService, router);
  }

  init() {

  }

  public getChange(data: any) {
    if (data.alterzustand === 0 || data.alterzustand && (data.neuerzustand !== 0 || data.alterzustand !== 0 )) {
      return data.alterzustand + '->' + data.neuerzustand;
    }
    return '';
  }

  public customSort(event: SortEvent) {
    if (event.field === 'date') {
      event.data.sort((data1, data2) => {
        return event.order * (data2.date - data1.date);
      });
    }

  }


}
