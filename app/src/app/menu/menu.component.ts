import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/service/authentication/authentication.service';
import {MenuService} from "./menu.service";
import {RoutingService} from "dsa-components";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  get items() {
    return this.menuService.items;
  }
  constructor(private menuService: MenuService, router: RoutingService, authenticationService: AuthenticationService) {
    authenticationService.onLogout.subscribe(() => router.navigateByUrl('/home'));
  }



  ngOnInit() {
  }

}
