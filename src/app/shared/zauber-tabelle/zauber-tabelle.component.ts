import {Component, Input, OnInit} from '@angular/core';
import {InputSwitch} from 'primeng/primeng';

@Component({
  selector: 'app-zauber-tabelle',
  templateUrl: './zauber-tabelle.component.html',
  styleUrls: ['./zauber-tabelle.component.css']
})
export class ZauberTabelleComponent implements OnInit {

  @Input()
  public data: any[];

  constructor() { }

  ngOnInit() {
  }



}
