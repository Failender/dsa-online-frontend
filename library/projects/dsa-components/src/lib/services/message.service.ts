import {Injectable} from '@angular/core';
import {Message} from 'primeng/api';

@Injectable()
export class MessageService {

  public messages: Message[] = [];

  constructor() { }

  public add(message: Message) {
    this.messages.push(message);
    setTimeout(() => {
      this.messages.splice(this.messages.indexOf(message), 1);
    }, 5000);
  }

  public error(message: string) {
    this.add({severity: 'error', summary: message});
  }

  public info(message: string) {

    this.add({severity: 'info', summary: message});
  }
}

