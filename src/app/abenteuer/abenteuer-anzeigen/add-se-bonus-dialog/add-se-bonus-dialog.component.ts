import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {HeldenService} from "../../../meine-helden/helden.service";
import {GruppenService} from "../../../shared/gruppen.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../service/message/message.service";
import {AbenteuerService} from "../../abenteuer.service";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-add-se-bonus-dialog',
  templateUrl: './add-se-bonus-dialog.component.html',
  styleUrls: ['./add-se-bonus-dialog.component.css']
})
export class AddSeBonusDialogComponent implements OnChanges {

  @Input()
  public gruppeid: number;

  @Input()
  public abenteuer: number;

  public helden = [];

  public form = new FormGroup({
      held: new FormControl("", Validators.required),
      se: new FormControl("", Validators.required)
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
      this.abenteuerService.createSeBonus(this.form.value.held.id, this.abenteuer, this.form.value.se)
        .subscribe(() => {
          this.messageService.info("SE hinzugefügt");
          this.onClose.next(true);
        });
    } else {
      this.messageService.error("Formular nicht korrekt ausgefüllt");
    }
  }


}
