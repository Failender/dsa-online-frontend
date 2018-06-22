import { Injectable } from '@angular/core';
import {SessionService} from "../service/session/session.service";
import {HeldenService} from "../meine-helden/helden.service";
import {MenuItem} from "primeng/api";
import {AuthenticationService} from "../service/authentication/authentication.service";
import {RoutingService} from '../shared/routing.service';

export interface CustomMenuItem extends MenuItem {
  mobile: boolean;
}


@Injectable()
export class MenuService {

  public items: CustomMenuItem[] = [
    this.createItem('Home', 'home'),
    this.createItem('Öffentliche Helden', 'groups/public'),
    this.createNoMobileItem('Kalender', 'kalender'),
  ];

  public authenticatedItems: CustomMenuItem[] = [
    this.createItem('Meine Helden', 'helden')
  ]

  public protectedItems = {
    'CREATE_USER': [
      this.createItem('Nutzer-Verwaltung', 'users/manage')
    ],
    'VIEW_ALL': [
      this.createItem('Gruppen-Ansicht', 'groups')
    ]
  }

  private heldenItems: CustomMenuItem[] =
    [
      this.createItem('Übersicht', 'held/uebersicht'),
      this.createItem('Talente', 'held/talente'),
      this.createItem('Ereignisse', 'held/ereignisse')
    ];

  private createItem(label: string, link: string): CustomMenuItem {
    return {
      label,
      command: () => this.routingService.navigateByUrl(link),
      mobile: true
    };
  }

  private createNoMobileItem(label: string, link: string): CustomMenuItem {
    return {
      label,
      command: () => this.routingService.navigateByUrl(link),
      mobile: false
    };
  }

  private itemsToUnload: CustomMenuItem[] = [];
  private heldItems: CustomMenuItem[] = [];

  private removeHeldItems() {
    this.heldItems.forEach(item => {
      this.removeItem(item);
    })
    this.heldItems = [];
  }
  constructor(sessionService: SessionService, heldenService: HeldenService, authenticationService: AuthenticationService, private routingService: RoutingService) {
    heldenService.heldLoaded.subscribe(
      () => {
        this.removeHeldItems();
        if (heldenService.held.zauberliste.zauber.length > 0) {

          const zauberItem = this.createItem('Zauber', 'held/zauber')
          this.heldItems.push(zauberItem);
        }
        this.heldItems.push(... this.heldenItems)
        this.heldItems.forEach(item => this.addItem(item));

      }
    )
    authenticationService.onLogin.subscribe(
      () => {
        this.itemsToUnload = [];
        this.authenticatedItems.forEach(item => this.addItem(item));
        this.itemsToUnload.push(...this.authenticatedItems);
        authenticationService.rights.forEach(right => {
          const items = this.protectedItems[right]
          if (items) {
            items.forEach(item => this.addItem(item));
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

  private removeItem(item: CustomMenuItem) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(this.items.indexOf(item), 1);
    }
  }

  private addItem(item: CustomMenuItem) {
    if (!item.mobile && this.isMobile()) {
      return;
    }
    this.items.push(item);
  }

  private isMobile(): boolean {

    return screen.width < 1000;
  }
}


