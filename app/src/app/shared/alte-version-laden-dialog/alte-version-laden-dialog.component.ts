import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {HeldenInfo} from '../../meine-helden/helden.service';
import {VersionService} from './version.service';
import {SelectItem} from 'primeng/api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RoutingService} from '../routing.service';
import {MessageService} from "dsa-components";

@Component({
  selector: 'app-alte-version-laden-dialog',
  templateUrl: './alte-version-laden-dialog.component.html',
  styleUrls: ['./alte-version-laden-dialog.component.css'],
})
export class AlteVersionLadenDialogComponent implements OnInit, OnChanges {


  @Input()
  public held: HeldenInfo;

  public versions = [];

  public versionsDropdown: SelectItem[];

  @Output()
  public forceReload = new EventEmitter<void>()

  public compareForm = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required)
  }
  // , {
  //   validator: this.customValidation
  // }
  );

  @Output()
  public dialogClosed = new EventEmitter<number>();

  constructor(private versionService: VersionService, private routingService: RoutingService, private messageService: MessageService) { }

  ngOnInit() {
  }

  onHide() {
    this.dialogClosed.emit();
  }

  onSubmit() {

    if (this.compareForm.valid) {
      let from = this.compareForm.value.from;
      let to = this.compareForm.value.to;
      if (from === to) {
        this.messageService.info('Bitte zwei unterschiedliche Versionen auswählen');
        return;
      }
      if (from > to) {
        const temp = from;
        from = to;
        to = temp;
      }
      const url = `/held/vergleichen/${this.held.id}/${from}/${to}`;
      this.routingService.navigateByUrl(url);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.versions = [];
    if (this.held) {
      this.reloadVersions();
    }

  }

  private reloadVersions() {
    this.versionService.getVersionen(this.held.id).subscribe((data) => {
      this.versions = data;
      this.versionsDropdown = this.versions.map(version =>  {
        return {'label': version.version, 'value': version.version}; });
    });
  }

  loadVersion(version: number) {
    this.dialogClosed.emit(version);
  }

  deleteVersion(version: number) {
    this.versionService.deleteVersion(this.held.id, version)
      .subscribe(() => {
        this.forceReload.emit();
        this.reloadVersions();
      });
    // this.dialogClosed.emit(version);
  }

}
