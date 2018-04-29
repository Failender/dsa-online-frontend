import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './header/login/login.component';
import {DialogModule} from 'primeng/dialog';
import {MessageModule} from 'primeng/message';
import { MenuComponent } from './menu/menu.component';
import {PanelModule} from 'primeng/panel';
import {RouterModule, Routes} from '@angular/router';
import {GrowlModule} from 'primeng/growl';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/primeng';
import {AuthenticationService} from './service/authentication/authentication.service';
import {RestService} from './service/rest/rest.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import { HomeComponent } from './home/home.component';
import {MessageService} from './service/message/message.service';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  { path: '**', redirectTo : '/home' }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, DialogModule, MessageModule, PanelModule, GrowlModule, ReactiveFormsModule, FormsModule, MenuModule, PanelMenuModule, HttpClientModule,
    BrowserAnimationsModule, ButtonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [AuthenticationService, RestService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
