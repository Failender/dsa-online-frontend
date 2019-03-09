import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {HeldenInfo} from "../../../meine-helden/helden.service";
import {GruppenService} from "../../gruppen.service";
import {MessageService} from "dsa-components";

@Component({
  selector: 'app-select-gruppe-dialog',
  templateUrl: './select-gruppe-dialog.component.html',
  styleUrls: ['./select-gruppe-dialog.component.css']
})
export class SelectGruppeDialogComponent implements OnInit, OnChanges {


  @Input() held: HeldenInfo;
  @Output() public dialogClosed = new EventEmitter<boolean>();

  public selectedGroup = null;
  public groups: any
  constructor(private gruppenService: GruppenService, private messageService: MessageService) { }

  ngOnInit() {
    this.gruppenService.getGroups()
      .subscribe(data => {
        this.groups = data;
      });
  }

  onSave() {
    if(!this.selectedGroup) {
      this.dialogClosed.next(false);
      return;
    }
    this.gruppenService.updateGruppe(this.held.id, this.selectedGroup)
      .subscribe(
        () => {
          this.messageService.info('Gruppe erfolgreich geändert');
          this.dialogClosed.next(true);
        }
      );
  }

  onGroupSelect(data) {
    this.selectedGroup = data.value.id;
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

}
