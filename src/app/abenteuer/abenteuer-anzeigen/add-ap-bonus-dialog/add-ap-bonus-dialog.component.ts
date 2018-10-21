import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-add-ap-bonus-dialog',
  templateUrl: './add-ap-bonus-dialog.component.html',
  styleUrls: ['./add-ap-bonus-dialog.component.css']
})
export class AddApBonusDialogComponent implements OnInit {

  @Input()
  public gruppeid: number;

  @Output()
  public onClose = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
  }

}
