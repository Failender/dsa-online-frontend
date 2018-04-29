import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: 'home'
    },
    {
      label: 'Held',
      items: [
        {
          label: 'Uebersicht',
          routerLink: 'heldenbogen/uebersicht'
        },
        {
          label: 'Kampf',
          routerLink: 'heldenbogen/kampf'
        },
        {
          label: 'Zauber',
          routerLink: 'heldenbogen/zauber'
        },
        {
          label: 'Ereignisse',
          routerLink: 'heldenbogen/ereignisse'
        },
        {
          label: 'Talente',
          routerLink: 'heldenbogen/talente'
        },
        {
          label: 'Inventar',
          routerLink: 'heldenbogen/inventar'
        },

      ]
    },
    {
      label: 'Held laden',
      routerLink: 'laden'
    },
    {
      routerLink: 'speichern',
      label: 'Held speichern'
    },
    {
      label: 'Tabellen',
      items: [
        {
          label: 'Trefferzonen',
          routerLink: 'tabellen/trefferzonen'
        },
        {
          label: 'Ruestungen',
          routerLink: 'tabellen/ruestungen'
        },
        {
          label: 'Fernkampferschwernisse',
          routerLink: 'tabellen/fernkampferschwernisse'
        }
      ]
    },
    {
      label: 'Gruppe',
      items: [
        {
          label: 'Abenteuerlog',
          routerLink: 'gruppen/abenteuerlog'
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
