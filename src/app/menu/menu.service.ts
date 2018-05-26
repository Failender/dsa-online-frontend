import { Injectable } from '@angular/core';
import {SessionService} from "../service/session/session.service";
import {HeldenService} from "../meine-helden/helden.service";
import {MenuItem} from "primeng/api";
import {AuthenticationService} from "../service/authentication/authentication.service";
import {RouterConfigLoader} from '@angular/router/src/router_config_loader';
import {Router} from '@angular/router';

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

  private heldenItems: MenuItem[] =
    [
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
    ];


  private itemsToUnload: MenuItem[] = [];
  private heldItems: MenuItem[] = [];

  private removeHeldItems() {
    this.heldItems.forEach(item => {
      this.removeItem(item);
    })
    this.heldItems = [];
  }
  constructor(sessionService: SessionService, heldenService: HeldenService, authenticationService: AuthenticationService) {
    this.removeHeldItems();
    heldenService.heldLoaded.subscribe(
      () => {

        if (heldenService.held.zauberliste.zauber.length > 0) {
          const zauberItem = {
            label: 'Zauber',
            routerLink: 'held/zauber',
          };
          this.heldItems.push(zauberItem);
        }
        this.heldItems.push(... this.heldenItems)
        this.items.push(... this.heldItems);

      }
    )
    authenticationService.onLogin.subscribe(
      () => {
        this.itemsToUnload = [];
        this.items.push(...this.authenticatedItems);
        this.itemsToUnload.push(...this.authenticatedItems);
        authenticationService.rights.forEach(right => {
          const items = this.protectedItems[right]
          if (items) {
            this.items.push(...items)
            this.itemsToUnload.push(...items);
          }

        });
      });
    authenticationService.onLogout.subscribe(
      () => {
        this.removeHeldItems();
        this.itemsToUnload.forEach(item => this.removeItem(item));
        this.itemsToUnload = [];
      }
    );
  }

  private removeItem(item: MenuItem) {
    console.debug('REMOVING ITEM ', item)
    this.items.splice(this.items.indexOf(item), 1);
  }
}

