import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AbenteuerService} from "../abenteuer.service";

@Component({
  selector: 'app-abenteuer-dialog',
  templateUrl: './abenteuer-dialog.component.html',
  styleUrls: ['./abenteuer-dialog.component.css']
})
export class AbenteuerDialogComponent implements OnInit {

  @Output()
  public dialogClosed = new EventEmitter();

  @Input()
  public set abenteuer(value) {
    if (value) {
      this.abenteuerService.getAbenteuer(value)
        .subscribe(data => this.abenteuerData = data);
    } else {
      this.abenteuerData = null;
    }
  }

  public abenteuerData;

  constructor(private abenteuerService: AbenteuerService) { }

  ngOnInit() {
  }

}
