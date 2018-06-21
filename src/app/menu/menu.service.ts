import { Injectable } from '@angular/core';
import {SessionService} from "../service/session/session.service";
import {HeldenService} from "../meine-helden/helden.service";
import {MenuItem} from "primeng/api";
import {AuthenticationService} from "../service/authentication/authentication.service";
import {RoutingService} from '../shared/routing.service';

export class CustomMenuItem implements MenuItem {
  mobile: boolean;
}


@Injectable()
export class MenuService {

  public items: MenuItem[] = [
    this.createItem('Home', 'home'),
    this.createItem('Öffentliche Helden', 'groups/public'),
    this.createItem('Kalender', 'kalender'),
  ];

  public authenticatedItems: MenuItem[] = [
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

  private heldenItems: MenuItem[] =
    [
      this.createItem('Übersicht', 'held/uebersicht'),
      this.createItem('Talente', 'held/talente'),
      this.createItem('Ereignisse', 'held/ereignisse')
    ];

  private createItem(label: string, link: string) {
    return {
      label,
      command: () => this.routingService.navigateByUrl(link)
    };
  }

  private itemsToUnload: MenuItem[] = [];
  private heldItems: MenuItem[] = [];

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
    this.items.splice(this.items.indexOf(item), 1);
  }

  private isMobile(): boolean {

    return screen.width < 1000;
  }
}


