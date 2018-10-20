import { Component, OnInit } from '@angular/core';
import {GruppenService} from "../../shared/gruppen.service";
import {KampagnenService} from "../../kampagnen/kampagnen.service";
import {MessageService} from "../../service/message/message.service";

@Component({
  selector: 'app-admin-kampagne',
  templateUrl: './admin-kampagne.component.html',
  styleUrls: ['./admin-kampagne.component.css']
})
export class AdminKampagneComponent implements OnInit {


  public name = "";
  constructor(private gruppenService: GruppenService, private kampagneService: KampagnenService, private messageService: MessageService) { }

  ngOnInit() {
  }

  createKampagne() {
    if (this.name.length === 0) {
      this.messageService.error("Bitte einen Namen für die Kampagne angeben");
      return;
    }
    this.kampagneService.createKampagne(this.name, this.gruppenService.getCurrentGroupValue().id)
      .subscribe(() => {
        this.gruppenService.forceRefresh()
        this.messageService.info(`Kampagne ${this.name} erfolgreich erstellt`);
      });
  }

}
