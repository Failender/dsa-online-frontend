import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from "@angular/core";


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './header/login/login.component';
import {MessageModule} from 'primeng/message';
import { MenuComponent } from './menu/menu.component';
import {PanelModule} from 'primeng/panel';
import {ActivatedRoute, Router, RouterModule, Routes} from "@angular/router";
import {GrowlModule} from 'primeng/growl';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuModule} from 'primeng/menu';
import {
  AccordionModule, CheckboxModule, DataTableModule, DropdownModule, FileUploadModule, InputSwitchModule, InputTextareaModule,
  InputTextModule,
  MultiSelectModule,
  PanelMenuModule, ProgressSpinnerModule, SidebarModule,
  TabMenuModule, TooltipModule, TreeTableModule
} from "primeng/primeng";
import {AuthenticationService, CustomHttpInterceptor, init} from './service/authentication/authentication.service';
import {RestService} from './service/rest/rest.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {GruppenService} from './shared/gruppen.service';
import { AlteVersionLadenDialogComponent } from './shared/alte-version-laden-dialog/alte-version-laden-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MenuService} from "./menu/menu.service";
import {RoutingService} from "./shared/routing.service";
import { PdfComponent } from './shared/pdf/pdf.component';
import { OeffentlicheHeldenComponent } from './oeffentliche-helden/oeffentliche-helden.component';
import { HeldVergleichComponent } from './held/held-vergleich/held-vergleich.component';
import { EreignisseTabelleComponent } from './shared/ereignisse-tabelle/ereignisse-tabelle.component';
import { TalenteTabelleComponent } from './shared/talente-tabelle/talente-tabelle.component';
import { ZauberTabelleComponent } from './shared/zauber-tabelle/zauber-tabelle.component';
import { KalenderComponent } from './kalender/kalender.component';
import {CalendarDateFormatter, CalendarModule, CalendarUtils} from 'angular-calendar';
import {CalendarUtilsExtendedService} from './kalender/calendar-utils-extended.service';
import {CalendarDateFormatterExtendedService} from './kalender/calendar-date-formatter-extended.service';
import { DsaKalenderComponent } from './dsa-kalender/dsa-kalender.component';
import { SkriptComponent } from './skripte/skript/skript.component';
import {DialogModule} from "primeng/dialog";
import { AlteVersionHochladenComponent } from './shared/alte-version-hochladen/alte-version-hochladen.component';
import {VersionService} from "./shared/alte-version-laden-dialog/version.service";
import { AbenteuerlogComponent } from './abenteuer/abenteuerlog/abenteuerlog.component';
import { AbenteuerErstellenComponent } from './abenteuer/abenteuer-erstellen/abenteuer-erstellen.component';
import {AbenteuerService} from "./abenteuer/abenteuer.service";
import { FullExportComponent } from './Administration/full-export/full-export.component';
import { FullImportComponent } from './Administration/full-import/full-import.component';
import {AdministrationService} from './Administration/administration.service';
import { MeisterVerwaltungComponent } from './Administration/meister-verwaltung/meister-verwaltung.component';
import {UserService} from "./nutzer-verwaltung/user.service";
import { CurrentHeldComponent } from './current-held/current-held.component';
import {CardModule} from "primeng/card";


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  { path: 'administration/user', component: NutzerVerwaltungComponent, data: {title: 'Nutzer-Verwaltung'}},
  { path: 'administration/export', component: FullExportComponent, data: {title: 'Export'}},
  { path: 'administration/import', component: FullImportComponent, data: {title: 'Import'}},
  { path: 'administration/meister', component: MeisterVerwaltungComponent, data: {title: 'Import'}},
  { path: 'helden', component: MeineHeldenComponent, data: {title: 'Meine Helden'}},
  { path: 'gruppen', component: OeffentlicheHeldenComponent, data: {title: 'Öffentliche Helden'}},
  { path: 'held/uebersicht', component: HeldUebersichtComponent, data: {title: 'Übersicht'}},
  { path: 'held/ereignisse', component: HeldEreignisseComponent, data: {title: 'Ereignisse'}},
  { path: 'held/talente', component: HeldTalenteComponent, data: {title: 'Talente'}},
  { path: 'held/zauber', component: HeldZauberComponent, data: {title: 'Zauber'}},
  { path: 'kalender', component: DsaKalenderComponent, data: {title: 'Kalender'}},
  { path: 'scripts', component: SkriptComponent, data: {title: 'Skripte'}},
  { path: 'abenteuerlog', component: AbenteuerlogComponent, data: {title: 'Abenteuerlog'}},
  { path: 'abenteuerlog/create', component: AbenteuerErstellenComponent, data: {title: 'Abenteuerlog erstellen'}},
  { path: 'held/vergleichen/:id/:from/:to', component: HeldVergleichComponent, data: {title: 'Vergleichen'}},

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
    HeldUebersichtComponent,
    AlteVersionLadenDialogComponent,
    HeldEreignisseComponent,
    HeldTalenteComponent,
    HeldZauberComponent,
    PdfComponent,
    OeffentlicheHeldenComponent,
    HeldVergleichComponent,
    EreignisseTabelleComponent,
    TalenteTabelleComponent,
    ZauberTabelleComponent,
    KalenderComponent,
    DsaKalenderComponent,
    SkriptComponent,
    AlteVersionHochladenComponent,
    AbenteuerlogComponent,
    AbenteuerErstellenComponent,
    FullExportComponent,
    FullImportComponent,
    MeisterVerwaltungComponent,
    CurrentHeldComponent,
  ],
  imports: [
    BrowserAnimationsModule, CalendarModule.forRoot(), MultiSelectModule, FileUploadModule, InputSwitchModule, PanelMenuModule, TreeTableModule,
    BrowserModule, DialogModule, MessageModule, PanelModule, GrowlModule, ReactiveFormsModule, FormsModule, MenuModule, TabMenuModule,
    HttpClientModule, ButtonModule, CheckboxModule, TableModule, DropdownModule, AccordionModule, PdfViewerModule, InputTextModule, InputTextareaModule, TooltipModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ), CardModule, SidebarModule,

  ],
  providers: [AuthenticationService, RestService, MessageService, VersionService, SessionService, HeldenService, UserService,
    GruppenService, MenuService, RoutingService, AbenteuerService, AdministrationService
    , { provide: LOCALE_ID, useValue: 'de' },
    {provide: CalendarUtils, useClass: CalendarUtilsExtendedService},
    {provide: CalendarDateFormatter, useClass: CalendarDateFormatterExtendedService},
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      multi: true,
      deps: [AuthenticationService, MenuService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
      deps: [MessageService]
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
