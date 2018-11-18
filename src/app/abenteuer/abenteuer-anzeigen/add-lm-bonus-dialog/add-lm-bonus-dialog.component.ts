import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {HeldenService} from "../../../meine-helden/helden.service";
import {GruppenService} from "../../../shared/gruppen.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../service/message/message.service";
import {AbenteuerService} from "../../abenteuer.service";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-add-lm-bonus-dialog',
  templateUrl: './add-lm-bonus-dialog.component.html',
  styleUrls: ['./add-lm-bonus-dialog.component.css']
})
export class AddLmBonusDialogComponent implements OnChanges {

  @Input()
  public gruppeid: number;

  @Input()
  public abenteuer: number;

  public helden = [];

  public form = new FormGroup({
      held: new FormControl("", Validators.required),
      lm: new FormControl("", Validators.required)
    }
  );

  @Output()
  public onClose = new EventEmitter<boolean>();

  constructor(private gruppenService: GruppenService, private messageService: MessageService,
    private abenteuerService: AbenteuerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gruppeid) {
      this.gruppenService.getHeldenForGruppe(this.gruppeid, true)
        .subscribe(data => this.helden = data);
    }
  }

  submit() {
    if (this.form.valid) {
      this.abenteuerService.createLmBonus(this.form.value.held.id, this.abenteuer, this.form.value.lm)
        .subscribe(() => {
          this.messageService.info("Lehrmeister hinzugefügt");
          this.onClose.next(true);
        });
    } else {
      this.messageService.error("Formular nicht korrekt ausgefüllt");
    }
  }


}
