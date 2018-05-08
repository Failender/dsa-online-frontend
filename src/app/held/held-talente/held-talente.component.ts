import { Component, OnInit } from '@angular/core';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {Router} from '@angular/router';
import {HeldenService} from '../../meine-helden/helden.service';

@Component({
  selector: 'app-held-talente',
  templateUrl: './held-talente.component.html',
  styleUrls: ['./held-talente.component.css']
})
export class HeldTalenteComponent extends HeldenComponent {

  constructor(heldenService: HeldenService, router: Router) {
    super(heldenService, router);
  }


}
