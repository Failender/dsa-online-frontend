import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {HeldenInfo} from "../../meine-helden/helden.service";
import {VersionService} from "../alte-version-laden-dialog/version.service";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "../service/authentication/authentication.service";
import {MessageService} from '../service/message/message.service';

@Component({
  selector: 'app-alte-version-hochladen',
  templateUrl: './alte-version-hochladen.component.html',
  styleUrls: ['./alte-version-hochladen.component.css']
})
export class AlteVersionHochladenComponent implements OnInit, OnChanges {


  public versions = [];

  public uploadUrl = '';

  @Input()
  public held: HeldenInfo;

  @Output()
  public dialogClosed = new EventEmitter<void>();

  @Output()
  public versionUploaded = new EventEmitter<void>();

  constructor(private versionService: VersionService, private authenticationService: AuthenticationService, private messageService: MessageService) { }

  ngOnInit() {
  }

  onHide() {
    this.dialogClosed.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.versions = [];
    if (this.held) {
      this.uploadUrl = environment.rest + 'helden/' + this.held.id + '/upload'
      this.versionService.getVersionen(this.held.id).subscribe((data) => {
        this.versions = data;
      });
    }

  }

  onBeforeSend(event) {
    event.xhr.setRequestHeader('X-PASSWORD', this.authenticationService.authentication.password)
    event.xhr.setRequestHeader('X-USER', this.authenticationService.authentication.username)

  }

  onUpload(event) {
    const response = JSON.parse(event.xhr.response);
    this.messageService.info(response.join('\n'));
    this.versionUploaded.emit();
    this.dialogClosed.emit();
  }

}
