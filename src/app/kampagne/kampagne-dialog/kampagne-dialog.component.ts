import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-kampagne-dialog',
  templateUrl: './kampagne-dialog.component.html',
  styleUrls: ['./kampagne-dialog.component.css']
})
export class KampagneDialogComponent implements OnInit {

  @Input() public kampagne: number;

  @Output()
  public dialogClosed = new EventEmitter();

  public kampagneName;

  constructor() { }

  ngOnInit() {
  }

}
