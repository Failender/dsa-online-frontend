import { Component, OnInit } from '@angular/core';
import {HeldenService} from '../../meine-helden/helden.service';
import {Router} from '@angular/router';
import {HeldenComponent} from '../helden-component/helden-component.component';

@Component({
  selector: 'app-held-zauber',
  templateUrl: './held-zauber.component.html',
  styleUrls: ['./held-zauber.component.css']
})
export class HeldZauberComponent extends HeldenComponent {

  constructor(heldenService: HeldenService, router: Router) {
    super(heldenService, router);
  }

}
