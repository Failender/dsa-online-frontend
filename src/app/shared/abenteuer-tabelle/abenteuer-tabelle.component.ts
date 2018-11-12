import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {RoutingService} from "../routing.service";
import {AbenteuerDto, AbenteuerService} from "../../abenteuer/abenteuer.service";
import {GruppenService} from "../gruppen.service";

@Component({
  selector: 'app-abenteuer-tabelle',
  templateUrl: './abenteuer-tabelle.component.html',
  styleUrls: ['./abenteuer-tabelle.component.css']
})
export class AbenteuerTabelleComponent implements OnInit, OnChanges {

  @Input() public abenteuer: AbenteuerDto[] = [];
  public canEdit = false;

  public abenteuerId;

  constructor(private routingService: RoutingService, private gruppenService: GruppenService, private abenteuerService: AbenteuerService) { }

  ngOnInit() {
  }

  openAbenteuer(data) {
    this.routingService.navigateByUrl(`abenteuer/${data.id}`)
  }

  dialogAbenteuer(data) {
    this.abenteuerId = data.id;
  }


  deleteEntry(data) {
    this.abenteuerService.deleteAbenteuer(data.id)
      .subscribe(() => this.gruppenService.forceRefresh());


  }

  ngOnChanges(changes: SimpleChanges): void {
    if ("abenteuer" in changes) {
      if (this.abenteuer && this.abenteuer.length !== 0) {
        this.canEdit = this.abenteuerService.canEdit(this.abenteuer[0]);
      }
    }
  }

}
