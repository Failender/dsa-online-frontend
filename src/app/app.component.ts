import { Component } from '@angular/core';
import {Message} from 'primeng/api';
import {MessageService} from './service/message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  constructor(private messageService: MessageService) {
  }

  public menuVisible = true;
  onIconClick() {
    this.menuVisible = !this.menuVisible;

  }

  public get messages(): Message[] {
    return this.messageService.messages;
  }

  public set messages(value: Message[]){
    this.messageService.messages = value;
  }
}
