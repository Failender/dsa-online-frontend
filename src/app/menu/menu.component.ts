import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {HeldenService} from '../meine-helden/helden.service';

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

  private heldenItem: MenuItem =
    {
      label: 'Held',
      items: [
        {
          label: 'Übersicht',
          routerLink: 'held/uebersicht'
        },
        {
          label: 'Talente',
          routerLink: 'held/talente'
        },

        {
          label: 'Ereignisse',
          routerLink: 'held/ereignisse'
        }
      ]

    };


  private heldItemsLoaded = false;
  constructor(auth: AuthenticationService, heldenService: HeldenService) {
    heldenService.heldLoaded.subscribe(
      () => {
        if (this.heldItemsLoaded) {
          this.unloadHeldItems();
        }
        this.heldItemsLoaded = true;
        const deepCopy = JSON.parse(JSON.stringify(this.heldenItem));
        if (heldenService.held.zauberliste.zauber.length > 0) {
          deepCopy.items.push({
            label: 'Zauber',
            routerLink: 'held/zauber',
          });
        }
        this.items.push(deepCopy);

      }
    )
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
        auth.rights.forEach(right => {
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

  private unloadHeldItems(): void {
    this.items.splice(this.items.findIndex(e => e.label === 'Held'), 1);
  }

  ngOnInit() {
  }

}
