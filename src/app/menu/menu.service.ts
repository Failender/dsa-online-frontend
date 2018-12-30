import {Injectable} from '@angular/core';
import {SessionService} from "../shared/service/session/session.service";
import {HeldenService} from "../meine-helden/helden.service";
import {MenuItem} from "primeng/api";
import {
  AuthenticationService,
  CREATE_USER,
  EDIT_KAMPAGNE,
  FULL_EXPORT,
  FULL_IMPORT,
  MEISTER
} from "../shared/service/authentication/authentication.service";
import {RoutingService} from '../shared/routing.service';
import {isMobile} from "../util/constants";

export interface CustomMenuItem extends MenuItem {
  mobile: boolean;
}

interface NestedCustomMenuItem extends MenuItem {
  parent: string;
  item: CustomMenuItem;
  permission: string;
}


@Injectable()
export class MenuService {


  public items: CustomMenuItem[] = [
    this.createItem('Home', 'home'),
    this.createItem('Gruppen Ansicht', 'gruppen'),
    this.createItem('Abenteuer', 'abenteuer'),
    this.createItem('Kampagnen', 'abenteuer/kampagnen'),
    this.createNoMobileItem('Kalender', 'kalender'),
  ];

  public authenticatedItems: CustomMenuItem[] = [
    this.createItem('Meine Helden', 'helden')
  ]

  public protectedItems = {
    'EDIT_SCRIPTS': [
      this.createNoMobileItem('Skripte', 'scripts')
    ]
  }

  private nestedItems: NestedCustomMenuItem[] = [
    this.createNestedItem('Kampagnen Verwaltung', 'administration/kampagnen', 'Administration', EDIT_KAMPAGNE),
    this.createNestedItem('Export', 'administration/export', 'Administration', FULL_EXPORT),
    this.createNestedItem('Import', 'administration/import', 'Administration', FULL_IMPORT),
    this.createNestedItem('Nutzer-Erstellung', 'administration/user', 'Administration', CREATE_USER),
    this.createNestedItem('Meister', 'administration/meister', 'Administration', CREATE_USER),
    this.createNestedItem('Abenteuer erstellen', 'abenteuer/erstellen', 'Administration', MEISTER)
  ];



  private heldenItems: CustomMenuItem[] =
    [
      this.createItem('Übersicht', 'held/uebersicht'),
      this.createItem('Steigern', 'held/steigern'),
      this.createItem('Inventar', 'held/inventar'),
      this.createItem('Geld', 'held/geld'),
      // this.createItem('Talente', 'held/talente'),
      this.createItem('Ereignisse', 'held/ereignisse')
    ];

  private heldItem: CustomMenuItem = this.createItem('Held', null, this.heldenItems);

  private createItem(label: string, link: string, items?: CustomMenuItem[]): CustomMenuItem {
    return {
      label,
      command: () => this.routingService.navigateByUrl(link),
      mobile: true,
      items
    };
  }

  private createNestedItem(label: string, link: string, parent: string, permission: string): NestedCustomMenuItem {
    return {
      parent,
      item: this.createItem(label, link),
      permission
    };
  }

  private createNoMobileItem(label: string, link: string, items?: CustomMenuItem[]): CustomMenuItem {
    return {
      label,
      command: () => this.routingService.navigateByUrl(link),
      mobile: false,
      items
    };
  }

  private itemsToUnload: CustomMenuItem[] = [];
  private heldItems: CustomMenuItem[] = [];

  private removeHeldItems() {
    this.heldItems.forEach(item => {
      this.removeItem(item);
    })
    if (this.heldItem.items.length === 3) {
      this.heldItem.items.splice(2, 0);
    }
    this.heldItems = [];
  }
  constructor(sessionService: SessionService, heldenService: HeldenService, authenticationService: AuthenticationService, private routingService: RoutingService) {
    if (isMobile()) {
      this.items = this.items.filter(item => item.mobile);
    }
    heldenService.heldLoaded.subscribe(
      () => {
        this.removeHeldItems();
        if (heldenService.held.zauberliste.zauber.length > 0) {

          const zauberItem = this.createItem('Zauber', 'held/zauber')
          const menuItems: MenuItem[] = <MenuItem[]>this.heldItem.items;

          menuItems.push(zauberItem);
        }
        this.heldItems.push(this.heldItem)
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
          const nestedItems = this.nestedItems.filter(item => item.permission === right);
          nestedItems.forEach(nestedItem => {
            let parent = this.items.find(item => item.label === nestedItem.parent);

            if (!parent) {
              parent = this.createNoMobileItem(nestedItem.parent, null, []);
              this.items.push(parent);
            }
            const parentItems: MenuItem[] = <MenuItem[]> parent.items;
            parentItems.push(nestedItem.item);
          });

        });
      });
    authenticationService.onLogout.subscribe(
      () => {
        this.removeHeldItems();
        this.itemsToUnload.forEach(item => this.removeItem(item));
        this.itemsToUnload = [];
        authenticationService.rights.forEach(permission => {
          const nestedItems = this.nestedItems.filter(item => item.permission === permission);
          nestedItems.forEach(nestedItem => {
            const parentIndex = this.items.findIndex(item => item.label === nestedItem.parent);
            if (parentIndex !== -1) {
              this.items.splice(parentIndex, 1);
            }
          });
        });
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
    if (!item.mobile && isMobile()) {
      return;
    }
    this.items.push(item);
  }
}


