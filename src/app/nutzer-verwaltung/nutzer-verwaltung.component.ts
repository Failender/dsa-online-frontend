import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {GruppenService} from '../meine-helden/gruppen.service';
import {UserService} from './user.service';
import {MessageService} from '../service/message/message.service';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Component({
  selector: 'app-nutzer-verwaltung',
  templateUrl: './nutzer-verwaltung.component.html',
  styleUrls: ['./nutzer-verwaltung.component.css'],
  providers: [UserService]
})
export class NutzerVerwaltungComponent implements OnInit {

  public gruppen: any[];

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl(''),
    token: new FormControl('', Validators.required),
    gruppe: new FormControl('', Validators.required)
  });

  constructor(private gruppenService: GruppenService, private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
    this.gruppenService.getGruppen()
      .subscribe(data => {
        data.forEach(gruppe => gruppe.value = gruppe.label)
        this.gruppen = data;
      });
  }

  onSubmit() {
    if(this.form.valid) {
      this.userService.createUser(this.form.value)
        .pipe(catchError((error) =>this.handleError(error)))
        .subscribe(
          () => {
            this.messageService.info('Nutzer erstellt');
          }
        );
    } else {
      this.messageService.error('Formular ungültig');
    }
  }

  handleError(error) {
    if (error.status === 409) {
      this.messageService.error('Username bereits vergeben');
    } else {
      this.messageService.error('Unerwarteter Fehler ' + error.message);
    }

    return ErrorObservable.create(error);
  }

}
