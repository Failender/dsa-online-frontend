import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InputSwitch} from 'primeng/primeng';
import {HeldenInfo} from '../../meine-helden/helden.service';

@Component({
  selector: 'app-alte-version-laden-dialog',
  templateUrl: './alte-version-laden-dialog.component.html',
  styleUrls: ['./alte-version-laden-dialog.component.css']
})
export class AlteVersionLadenDialogComponent implements OnInit, OnChanges {


  @Input()
  public held: HeldenInfo;

  public versions = [];

  @Output()
  public dialogClosed = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onHide() {
    this.dialogClosed.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.versions = [];
    if (this.held) {
      for (let i = 0; i < this.held.version; i++) {
        this.versions.push(i + 1);
      }
    }

  }

  loadVersion(version: number) {
    this.dialogClosed.emit(version);
  }

}
