import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {HeldenService} from '../meine-helden/helden.service';
import {MenuService} from "./menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  get items() {
    return this.menuService.items;
  }
  constructor(private menuService: MenuService) {

  }



  ngOnInit() {
  }

}
