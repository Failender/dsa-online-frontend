import { Component, OnInit } from '@angular/core';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {Router} from '@angular/router';
import {HeldenService} from '../../meine-helden/helden.service';

@Component({
  selector: 'app-held-ereignisse',
  templateUrl: './held-ereignisse.component.html',
  styleUrls: ['./held-ereignisse.component.css']
})
export class HeldEreignisseComponent extends HeldenComponent {

  constructor(heldenService: HeldenService, router: Router) {
    super(heldenService, router);
  }

  init() {

  }


}
