import {Component} from '@angular/core';
import {Message} from 'primeng/api';
import {MessageService} from './shared/service/message/message.service';
import {RoutingService} from './shared/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public menuVisible = false;
  constructor(private messageService: MessageService, routingService: RoutingService) {
    (window as any).global = window;
    routingService.routing.asObservable()
      .subscribe(() => {
        this.menuVisible = false;
      });
  }


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
