import { Component, OnInit } from '@angular/core';
import {HeldenService} from "dsa-components";

@Component({
  selector: 'app-current-held',
  templateUrl: './current-held.component.html',
  styleUrls: ['./current-held.component.css']
})
export class CurrentHeldComponent implements OnInit {

  constructor(private heldenService: HeldenService) { }

  ngOnInit() {
  }

  get held() {
    return this.heldenService.held;
  }

  get version() {
    return this.heldenService.versionInfo;
  }

}
