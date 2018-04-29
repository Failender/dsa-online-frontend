import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {MessageService} from '../../service/message/message.service';

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
    password: new FormControl('', Validators.required)
  });

  constructor(private messageService: MessageService, private authenticationService: AuthenticationService) { }


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
      this.authenticationService.authenticate(this.form.value)
        .subscribe(
          () => this.hideDialog.emit()
        );
    } else {
      this.messageService.add({severity: 'error', summary: 'Formular wurde nicht korrekt ausgefüllt'});

    }
  }

}
