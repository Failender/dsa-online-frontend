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
      done: true
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
      done: true
    },
    {
      label: 'Laden von Helden über URL',
      done: true
    },
    {
      label: 'Versions-Vergleich',
      done: true
    },
    {
      label: 'PDF für alte Helden',
      done: false
    },
    {
      label: 'Aventurischer Kalender',
      done: false
    },
    {
      label: 'Einträge für Gruppen im Kalender',
      done: false
    },
    {
      label: 'Einträge für Helden im Kalender',
      done: false
    },
    {
      label: 'Wecker für Helden (z.B. für Rüstungsgewöhnung)',
      done: false
    }

  ]

  constructor() { }

  ngOnInit() {
  }

}
