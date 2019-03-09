import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/internal/operators';
import {MessageService} from "dsa-components";
import {GruppenService} from '../../../shared/gruppen.service';
import {AbenteuerService} from '../../abenteuer.service';

@Component({
  selector: 'app-add-ap-bonus-dialog',
  templateUrl: './add-ap-bonus-dialog.component.html',
  styleUrls: ['./add-ap-bonus-dialog.component.css']
})
export class AddApBonusDialogComponent implements OnChanges {

  @Input()
  public gruppeid: number;

  @Input()
  public abenteuer: number;

  public helden = [];

  public form = new FormGroup({
      held: new FormControl("", Validators.required),
      ap: new FormControl("", Validators.required)
    }
  );

  @Output()
  public onClose = new EventEmitter<boolean>();

  constructor(private gruppenService: GruppenService, private messageService: MessageService, private abenteuerService: AbenteuerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gruppeid) {
      this.gruppenService.getHeldenForGruppe(this.gruppeid, true)
        .pipe(map(data => {
          data.unshift({label: 'Gruppe', value: {id: -1}});
          return data;
        }))
        .subscribe(data => this.helden = data);
    }
  }

  submit() {
    if (this.form.valid) {
      this.abenteuerService.createApBonus(this.form.value.held.id, this.abenteuer, this.form.value.ap)
        .subscribe(() => {
          this.messageService.info("AP-Bonus hinzugefügt");
          this.form.controls['ap'].patchValue('');
          this.onClose.next(true);
        });
    } else {
      this.messageService.error("Formular nicht korrekt ausgefüllt");
    }
  }

}
