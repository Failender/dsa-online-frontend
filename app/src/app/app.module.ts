import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from "@angular/core";


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './header/login/login.component';
import {MessageModule} from 'primeng/message';
import {MenuComponent} from './menu/menu.component';
import {PanelModule} from 'primeng/panel';
import {RouterModule, Routes} from "@angular/router";
import {GrowlModule} from 'primeng/growl';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuModule} from 'primeng/menu';
import {
  AccordionModule,
  CheckboxModule,
  DropdownModule,
  FileUploadModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  KeyFilterModule,
  MultiSelectModule,
  PanelMenuModule,
  SidebarModule,
  TabMenuModule,
  TooltipModule
} from 'primeng/primeng';
import {AuthenticationService} from './shared/service/authentication/authentication.service';
import {REST_URI_TOKEN, RoutingService, ServicesModule} from 'dsa-components';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {HomeComponent} from './home/home.component';
import {MeineHeldenComponent} from './meine-helden/meine-helden.component';
import {NutzerVerwaltungComponent} from './administration/nutzer-verwaltung/nutzer-verwaltung.component';
import {SessionService} from './shared/service/session/session.service';
import {TableModule} from 'primeng/table';
import {registerLocaleData} from '@angular/common';

import localeDe from '@angular/common/locales/de';
import {GruppenService} from './shared/gruppen.service';
import {MenuService} from "./menu/menu.service";
import {GroupviewComponent} from './group-view/groupview.component';
import {CalendarComponent} from './dsa-calendar/calendar.component';
import {DialogModule} from "primeng/dialog";
import {VersionService} from "./shared/alte-version-laden-dialog/version.service";
import {AbenteuerService} from "./abenteuer/abenteuer.service";
import {FullExportComponent} from './administration/full-export/full-export.component';
import {FullImportComponent} from './administration/full-import/full-import.component';
import {AdministrationService} from './administration/administration.service';
import {MeisterVerwaltungComponent} from './administration/meister-verwaltung/meister-verwaltung.component';
import {UserService} from "./administration/nutzer-verwaltung/user.service";
import {CurrentHeldComponent} from './current-held/current-held.component';
import {CardModule} from "primeng/card";
import {EditDsaDateModule} from "./edit-dsa-date/edit-dsa-date.module";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {environment} from "../environments/environment";
import {HeldModule} from "./held/held.module";
import {HeldenInfoTabelleComponent} from "./shared/helden-info-tabelle/helden-info-tabelle.component";
import {AlteVersionLadenDialogComponent} from "./shared/alte-version-laden-dialog/alte-version-laden-dialog.component";
import {AlteVersionHochladenComponent} from "./shared/alte-version-hochladen/alte-version-hochladen.component";
import {SelectGruppeDialogComponent} from "./shared/helden-info-tabelle/select-gruppe-dialog/select-gruppe-dialog.component";

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {path: '', redirectTo : '/home', pathMatch: 'full'},
  {path: 'abenteuer', loadChildren: './abenteuer/abenteuer.module#AbenteuerModule'},
  {path: 'skripte', loadChildren: './skripte/skript.module#SkriptModule'},
  {path: 'kampf', loadChildren: './kampf/kampf.module#KampfModule'},
  {path: 'held', loadChildren: './held/held.module#HeldModule'},
  { path: 'administration/user', component: NutzerVerwaltungComponent, data: {title: 'Nutzer-Verwaltung'}},
  { path: 'administration/export', component: FullExportComponent, data: {title: 'Export'}},
  { path: 'administration/import', component: FullImportComponent, data: {title: 'Import'}},
  { path: 'administration/meister', component: MeisterVerwaltungComponent, data: {title: 'Import'}},
  { path: 'helden', component: MeineHeldenComponent, data: {title: 'Meine Helden'}},
  { path: 'gruppen', component: GroupviewComponent, data: {title: 'Öffentliche Helden'}},
  { path: 'kalender', component: CalendarComponent, data: {title: 'Kalender'}},
  { path: '**', redirectTo : '/home' }
];


registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    SideMenuComponent,
    HomeComponent,
    MeineHeldenComponent,
    NutzerVerwaltungComponent,
    GroupviewComponent,
    CalendarComponent,
    FullExportComponent,
    FullImportComponent,
    MeisterVerwaltungComponent,
    CurrentHeldComponent,
    HeldenInfoTabelleComponent,
    AlteVersionLadenDialogComponent,
    AlteVersionHochladenComponent,
    SelectGruppeDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule, MultiSelectModule, FileUploadModule, InputSwitchModule, PanelMenuModule, KeyFilterModule,
    BrowserModule, DialogModule, MessageModule, PanelModule, GrowlModule, ReactiveFormsModule, FormsModule, MenuModule, TabMenuModule,
    HttpClientModule, ButtonModule, CheckboxModule, DropdownModule, EditDsaDateModule,
    AccordionModule, InputTextModule, InputTextareaModule, TooltipModule, TableModule,
    HeldModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ), CardModule, SidebarModule, ServicesModule.forRoot()

  ],
  providers: [AuthenticationService, VersionService, SessionService, UserService,
    GruppenService, MenuService, RoutingService, AbenteuerService, AdministrationService
    , { provide: LOCALE_ID, useValue: 'de' },
    {provide: REST_URI_TOKEN, useValue: environment.rest}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
