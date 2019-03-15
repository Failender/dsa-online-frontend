import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kampf-erstellen',
  templateUrl: './kampf-erstellen.component.html',
  styleUrls: ['./kampf-erstellen.component.css']
})
export class KampfErstellenComponent implements OnInit {


  public kampf;
  public teilnehmerChange;

  constructor() { }

  ngOnInit() {
  }

}
