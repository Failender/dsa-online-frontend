import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-talente-tabelle',
  templateUrl: './talente-tabelle.component.html',
  styleUrls: ['./talente-tabelle.component.css']
})
export class TalenteTabelleComponent implements OnInit {

  @Input()
  public data: any[];

  constructor() { }

  ngOnInit() {
  }

}
