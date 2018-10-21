import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {HeldenService} from "../../../meine-helden/helden.service";
import {GruppenService} from "../../../shared/gruppen.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-se-bonus-dialog',
  templateUrl: './add-se-bonus-dialog.component.html',
  styleUrls: ['./add-se-bonus-dialog.component.css']
})
export class AddSeBonusDialogComponent implements OnChanges {

  @Input()
  public gruppeid: number;

  public helden = [];

  public form = new FormGroup({
      held: new FormControl("", Validators.required),
      ap: new FormControl("", Validators.required)
    }
  );

  @Output()
  public onClose = new EventEmitter<boolean>();

  constructor(private gruppenService: GruppenService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.gruppeid) {
      this.gruppenService.getHeldenForGruppe(this.gruppeid, true)
        .subscribe(data => this.helden = data);
    }
  }


}
