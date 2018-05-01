import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';


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
import {CheckboxModule, DataTableModule, PanelMenuModule} from 'primeng/primeng';
import {AuthenticationService} from './service/authentication/authentication.service';
import {RestService} from './service/rest/rest.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import { HomeComponent } from './home/home.component';
import {MessageService} from './service/message/message.service';
import { MeineHeldenComponent } from './meine-helden/meine-helden.component';
import { NutzerVerwaltungComponent } from './nutzer-verwaltung/nutzer-verwaltung.component';
import { GruppenAnsichtComponent } from './gruppen-ansicht/gruppen-ansicht.component';
import {SessionService} from './service/session/session.service';
import { HeldenInfoTabelleComponent } from './shared/helden-info-tabelle/helden-info-tabelle.component';
import {TableModule} from 'primeng/table';
import {registerLocaleData} from '@angular/common';

import localeDe from '@angular/common/locales/de';
import { AuthenticationRequiredComponent } from './shared/authentication-required/authentication-required.component';
import {HeldenService} from './meine-helden/helden.service';
import { HeldUebersichtComponent } from './held/held-uebersicht/held-uebersicht.component';
import { HeldEreignisseComponent } from './held/held-ereignisse/held-ereignisse.component';
import { HeldenComponent } from './held/helden-component/helden-component.component';
import { HeldTalenteComponent } from './held/held-talente/held-talente.component';
import { HeldZauberComponent } from './held/held-zauber/held-zauber.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  { path: 'users/manage', component: NutzerVerwaltungComponent, data: {title: 'Nutzer-Verwaltung'}},
  { path: 'helden', component: MeineHeldenComponent, data: {title: 'Meine Helden'}},
  { path: 'groups', component: GruppenAnsichtComponent, data: {title: 'Gruppen-Ansicht'}},
  { path: 'held/uebersicht', component: HeldUebersichtComponent, data: {title: 'Übersicht'}},
  { path: 'held/ereignisse', component: HeldEreignisseComponent, data: {title: 'Ereignisse'}},
  { path: 'held/talente', component: HeldTalenteComponent, data: {title: 'Talente'}},
  { path: 'held/zauber', component: HeldZauberComponent, data: {title: 'Zauber'}},

  { path: '**', redirectTo : '/home' }
]

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    MeineHeldenComponent,
    NutzerVerwaltungComponent,
    GruppenAnsichtComponent,
    HeldenInfoTabelleComponent,
    AuthenticationRequiredComponent,
    HeldUebersichtComponent,
    HeldEreignisseComponent,
    HeldenComponent,
    HeldTalenteComponent,
    HeldZauberComponent,
  ],
  imports: [
    BrowserModule, DialogModule, MessageModule, PanelModule, GrowlModule, ReactiveFormsModule, FormsModule, MenuModule, PanelMenuModule,
    HttpClientModule, BrowserAnimationsModule, ButtonModule, CheckboxModule, TableModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),

  ],
  providers: [AuthenticationService, RestService, MessageService, SessionService, HeldenService,
    { provide: LOCALE_ID, useValue: 'de' }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
