import { Component, OnInit } from '@angular/core';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {Router} from '@angular/router';
import {HeldenService} from '../../meine-helden/helden.service';
import {SortEvent} from 'primeng/api';

@Component({
  selector: 'app-held-ereignisse',
  templateUrl: './held-ereignisse.component.html',
  styleUrls: ['./held-ereignisse.component.css']
})
export class HeldEreignisseComponent extends HeldenComponent {

  constructor(heldenService: HeldenService, router: Router) {
    super(heldenService, router);
  }

  init() {

  }

  public getChange(data: any) {
    if (data.alterzustand && data.neuerzustand) {
      return data.alterzustand + '->' + data.neuerzustand;
    }
    return '';
  }

  public customSort(event: SortEvent) {
    console.debug(event)
    if (event.field === 'date') {
      event.data.sort((data1, data2) => {
        return event.order * (data2.date - data1.date);
      });
    }

  }


}
