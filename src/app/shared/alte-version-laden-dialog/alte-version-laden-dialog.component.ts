import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InputSwitch} from 'primeng/primeng';
import {HeldenInfo} from '../../meine-helden/helden.service';
import {VersionService} from './version.service';
import {SelectItem} from 'primeng/api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RoutingService} from '../routing.service';

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

  public versionsDropdown: SelectItem[];

  public compareForm = new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required)
  }, {
    validator: this.customValidation
  });

  @Output()
  public dialogClosed = new EventEmitter<number>();

  constructor(private versionService: VersionService, private routingService: RoutingService) { }

  ngOnInit() {
  }

  onHide() {
    this.dialogClosed.emit();
  }

  customValidation(group: any) {

    return {
      areDifferent: true
    };
  }

  onSubmit() {

    if (this.compareForm.valid) {
      const url = `/held/vergleichen/${this.held.id}/${this.compareForm.value.from}/${this.compareForm.value.to}`;
      this.routingService.navigateByUrl(url);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.versions = [];
    if (this.held) {
      this.versionService.getVersionen(this.held.id).subscribe((data) => {
        this.versions = data;
        this.versionsDropdown = this.versions.map(version =>  {
          return {'label': version.version, 'value': version.version}; });
      });
    }

  }

  loadVersion(version: number) {
    this.dialogClosed.emit(version);
  }

}
