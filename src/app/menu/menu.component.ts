import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {HeldenService} from '../meine-helden/helden.service';
import {MenuService} from "./menu.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  get items() {
    return this.menuService.items;
  }
  constructor(private menuService: MenuService, router: Router, authenticationService: AuthenticationService) {
    authenticationService.onLogout.subscribe(() => router.navigateByUrl('/home'));
  }



  ngOnInit() {
  }

}
