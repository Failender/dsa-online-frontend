import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {GruppenService} from "../../../shared/gruppen.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../shared/service/message/message.service";
import {AbenteuerService} from "../../abenteuer.service";

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-bonus-dialog.component.html',
  styleUrls: ['./add-note-bonus-dialog.component.css']
})
export class AddNoteBonusDialogComponent implements OnChanges {

  @Input()
  public gruppeid: number;

  @Input()
  public abenteuer: number;

  public helden = [];

  public form = new FormGroup({
      note: new FormControl("", Validators.required),
    }
  );

  @Output()
  public onClose = new EventEmitter<boolean>();

  constructor(private gruppenService: GruppenService, private messageService: MessageService,
              private abenteuerService: AbenteuerService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.gruppeid) {
    //   this.gruppenService.getHeldenForGruppe(this.gruppeid, true)
    //     .pipe(map(data => {
    //       data.unshift({label: 'Gruppe', value: {id: -1}});
    //       return data;
    //     }))
    //     .subscribe(data => this.helden = data);
    // }
  }

  submit() {
    if (this.form.valid) {
      this.abenteuerService.createNote(this.abenteuer, this.form.value.note)
        .subscribe(() => {
          this.messageService.info("Notiz hinzugefügt");
          this.onClose.next(true);
          this.form.controls['note'].patchValue('');
        });
    } else {
      this.messageService.error("Formular nicht korrekt ausgefüllt");
    }
  }


}
