import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from '../service/authentication/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items: MenuItem[] = [
    {
      label: 'Home',
      routerLink: 'home'
    }
  ];

  public authenticatedItems: MenuItem[] = [
    {
      label: 'Meine Helden',
      routerLink: 'helden'
    }
  ]

  public protectedItems = {
    'CREATE_USER': [
      {
        label: 'Nutzer-Verwaltung',
        routerLink: 'users/manage'
      }
    ],
    'VIEW_ALL': [
      {
        label: 'Gruppen-Ansicht',
        routerLink: 'groups'
      }
    ]
  }


  constructor(private auth: AuthenticationService) {
    auth.onLogin.subscribe(
      () => {
        const itemsToAdd = this.authenticatedItems;
        auth.rights.forEach(right => {
          const items = this.protectedItems[right]
          if (items) {
            itemsToAdd.push(...items);
          }

        })
        this.items.push(...itemsToAdd);
      });
    auth.onLogout.subscribe(
      () => {
        const itemsToRemove = this.authenticatedItems;
        this.auth.rights.forEach(right => {
          const items = this.protectedItems[right]
          if (items) {
            itemsToRemove.push(...items);
          }

        })
        itemsToRemove.forEach(item => {
          const index = this.items.findIndex(l => l === item);
          this.items.splice(index, 1);
        });
      }

    );
  }

  ngOnInit() {
  }

}
