import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../service/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() iconClicked = new EventEmitter<void>();


  public showLogin = false;
  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

  onClick() {
    this.iconClicked.emit();
  }

  login() {
    this.showLogin = true;
  }

  logout() {
    this.auth.logout();
  }

}
