import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GruppenService} from '../shared/gruppen.service';
import {UserService} from './user.service';
import {MessageService} from '../service/message/message.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/index';

@Component({
  selector: 'app-nutzer-verwaltung',
  templateUrl: './nutzer-verwaltung.component.html',
  styleUrls: ['./nutzer-verwaltung.component.css'],
  providers: []
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
    if (this.form.valid) {
      this.userService.createUser(this.form.value)
        .pipe(catchError((error) => this.handleError(error)))
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
    return of(error);
  }

  fileChange(event) {
    const files = event.target.files;
    if (files.length === 1) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = fileObj => {
        const contents: any = fileObj.target;
        const text = contents.result;
        this.messageService.info('Nutzer werden erstellt..')
        this.userService.createUsers(text)
          .subscribe(
            () => this.messageService.info('Nutzer wurden erstellt')
          );
      }
      reader.readAsText(file);
    }
  }

}
