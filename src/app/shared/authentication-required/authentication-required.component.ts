import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentication-required',
  templateUrl: './authentication-required.component.html',
  styleUrls: ['./authentication-required.component.css']
})
export abstract class AuthenticationRequiredComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
    if  (this.authenticationService.authenticated) {
      this.init();
    } else {
      this.router.navigateByUrl('/home');
    }
  }

  protected abstract init(): void;

}



