import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-kampagne-dialog',
  templateUrl: './campaign-dialog.component.html',
  styleUrls: ['./campaign-dialog.component.css']
})
export class CampaignDialogComponent implements OnInit {

  @Input() public kampagne: number;

  @Output()
  public dialogClosed = new EventEmitter();

  public kampagneName;

  constructor() { }

  ngOnInit() {
  }

}
