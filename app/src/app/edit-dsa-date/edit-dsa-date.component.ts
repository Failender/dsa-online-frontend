import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DsaDatum, MONATE_DROPDOWN} from "../dsa-calendar/data";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-edit-dsa-date',
  templateUrl: './edit-dsa-date.component.html',
  styleUrls: ['./edit-dsa-date.component.css']
})
export class EditDsaDateComponent implements OnInit {


  @Input()
  public date: DsaDatum;

  @Input()
  public editDay = false;

  @Output()
  public dateChanged = new EventEmitter<DsaDatum>();

  @Output()
  public enter = new EventEmitter<DsaDatum>();
  constructor() { }

  ngOnInit() {
  }

  public onEnter() {
    this.enter.next(this.date);
  }

  naechsterMonat() {
    this.date.naechsterMonat()
    this.onDateChange();

  }

  letzterMonat() {
    this.date.letzterMonat();
    this.onDateChange();
  }

  onJahrChange() {
    this.onDateChange();
  }

  public onDateChange() {
    this.dateChanged.next(this.date);

  }

  get monate(): SelectItem[] {
    return MONATE_DROPDOWN;
  }

}
