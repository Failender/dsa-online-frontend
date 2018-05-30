import {Component, Input, OnInit} from '@angular/core';
import {SortEvent} from 'primeng/api';

@Component({
  selector: 'app-ereignisse-tabelle',
  templateUrl: './ereignisse-tabelle.component.html',
  styleUrls: ['./ereignisse-tabelle.component.css']
})
export class EreignisseTabelleComponent implements OnInit {

  @Input()
  public data: any[];

  constructor() { }

  ngOnInit() {
  }

  public getChange(data: any) {
    if (data.alterzustand === 0 && data. neuerzustand === 0 ) {
      return '';
    }
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
