import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public roadMap = [
    {
      label: 'Regelmäßiges updaten der Helden',
      done: true
    },
    {
      label: 'PDF-Download',
      done: false
    },
    {
      label: 'XML-Download',
      done: false
    },
    {
      label: 'PDF Einzel-Seitenansicht',
      done: false
    },
    {
      label: 'Öffentlich sichtbare Helden',
      done: false
    },
    {
      label: 'Laden von Helden über URL',
      done: true
    },


  ]

  constructor() { }

  ngOnInit() {
  }

}
