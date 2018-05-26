import { Injectable } from '@angular/core';
import {SessionService} from "../service/session/session.service";
import {HeldenService} from "../meine-helden/helden.service";
import {MenuItem} from "primeng/api";
import {AuthenticationService} from "../service/authentication/authentication.service";

@Injectable()
export class MenuService {

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
  private unloadHeldItems(): void {
    this.items.splice(this.items.findIndex(e => e.label === 'Held'), 1);
  }

  constructor(sessionService: SessionService, heldenService: HeldenService, authenticationService: AuthenticationService) {

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
    authenticationService.onLogin.subscribe(
      () => {
        const itemsToAdd = this.authenticatedItems;
        authenticationService.rights.forEach(right => {
          const items = this.protectedItems[right]
          if (items) {
            itemsToAdd.push(...items);
          }

        })
        this.items.push(...itemsToAdd);
      });
    authenticationService.onLogout.subscribe(
      () => {
        const itemsToRemove = this.authenticatedItems;
        authenticationService.rights.forEach(right => {
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
}

