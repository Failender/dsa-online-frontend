import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {MessageService} from '../../service/message/message.service';
import {SessionService} from '../../service/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {


  @Input() public visible: boolean
  @Output() public hideDialog = new EventEmitter<void>();

  @ViewChild('userinput')public userinput: ElementRef;
  public form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false)
  });

  constructor(private messageService: MessageService, private authenticationService: AuthenticationService, private sessionService: SessionService) { }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('visible' in changes) {
      if (this.visible) {
        this.userinput.nativeElement.focus();
      }
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const rememberMe = formValue.rememberMe;
      delete formValue.rememberMe;
      this.authenticationService.authenticate(this.form.value)
        .subscribe(
          () => {
            this.hideDialog.emit();
            if (rememberMe) {
              this.sessionService.userAuthentication.value = formValue;
            } else {
              this.sessionService.userAuthentication.value = null;
            }
          });
    } else {
      this.messageService.add({severity: 'error', summary: 'Formular wurde nicht korrekt ausgefüllt'});

    }
  }


}
