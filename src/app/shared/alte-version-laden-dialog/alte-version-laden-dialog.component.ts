import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InputSwitch} from 'primeng/primeng';
import {HeldenInfo} from '../../meine-helden/helden.service';
import {VersionService} from './version.service';

@Component({
  selector: 'app-alte-version-laden-dialog',
  templateUrl: './alte-version-laden-dialog.component.html',
  styleUrls: ['./alte-version-laden-dialog.component.css'],
  providers: [VersionService]
})
export class AlteVersionLadenDialogComponent implements OnInit, OnChanges {


  @Input()
  public held: HeldenInfo;

  public versions = [];

  @Output()
  public dialogClosed = new EventEmitter<number>();

  constructor(private versionService: VersionService) { }

  ngOnInit() {
  }

  onHide() {
    this.dialogClosed.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.versions = [];
    if (this.held) {
      this.versionService.getVersionen(this.held.id).subscribe((data) => this.versions = data)
    }

  }

  loadVersion(version: number) {
    this.dialogClosed.emit(version);
  }

}
