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
import {RestService} from './shared/service/rest/rest.service';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {HomeComponent} from './home/home.component';
import {MessageService} from './shared/service/message/message.service';
import {MeineHeldenComponent} from './meine-helden/meine-helden.component';
import {NutzerVerwaltungComponent} from './administration/nutzer-verwaltung/nutzer-verwaltung.component';
import {SessionService} from './shared/service/session/session.service';
import {HeldenInfoTabelleComponent} from './shared/helden-info-tabelle/helden-info-tabelle.component';
import {TableModule} from 'primeng/table';
import {registerLocaleData} from '@angular/common';

import localeDe from '@angular/common/locales/de';
import {HeldenService} from './meine-helden/helden.service';
import {HeldUebersichtComponent} from './held/held-uebersicht/held-uebersicht.component';
import {HeldEreignisseComponent} from './held/held-ereignisse/held-ereignisse.component';
import {HeldTalenteComponent} from './held/held-talente/held-talente.component';
import {HeldZauberComponent} from './held/held-zauber/held-zauber.component';
import {GruppenService} from './shared/gruppen.service';
import {AlteVersionLadenDialogComponent} from './shared/alte-version-laden-dialog/alte-version-laden-dialog.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {MenuService} from "./menu/menu.service";
import {RoutingService} from "./shared/routing.service";
import {PdfComponent} from './shared/pdf/pdf.component';
import {GroupviewComponent} from './group-view/groupview.component';
import {HeldVergleichComponent} from './held/held-vergleich/held-vergleich.component';
import {CalendarComponent} from './dsa-calendar/calendar.component';
import {SkriptComponent} from './skripte/skript/skript.component';
import {DialogModule} from "primeng/dialog";
import {AlteVersionHochladenComponent} from './shared/alte-version-hochladen/alte-version-hochladen.component';
import {VersionService} from "./shared/alte-version-laden-dialog/version.service";
import {AbenteuerService} from "./abenteuer/abenteuer.service";
import {FullExportComponent} from './administration/full-export/full-export.component';
import {FullImportComponent} from './administration/full-import/full-import.component';
import {AdministrationService} from './administration/administration.service';
import {MeisterVerwaltungComponent} from './administration/meister-verwaltung/meister-verwaltung.component';
import {UserService} from "./administration/nutzer-verwaltung/user.service";
import {CurrentHeldComponent} from './current-held/current-held.component';
import {CardModule} from "primeng/card";
import {SelectGruppeDialogComponent} from './shared/helden-info-tabelle/select-gruppe-dialog/select-gruppe-dialog.component';
import {ResultDisplayComponent} from './skripte/result-display/result-display.component';
import {TextResultComponent} from './skripte/result-display/text-result/text-result.component';
import {TableResultComponent} from './skripte/result-display/table-result/table-result.component';
import {SkriptRoutingComponent} from './skripte/skript-routing/skript-routing.component';

import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor";
import {TablesModule} from "./shared/tables/tables.module";
import {EditDsaDateModule} from "./edit-dsa-date/edit-dsa-date.module";
import {HeldSteigernComponent} from './held/held-steigern/held-steigern.component';
import {HeldInventarComponent} from './held/held-inventar/held-inventar.component';
import {HeldQuicknavComponent} from './held/held-quicknav/held-quicknav.component';
import { HeldGeldComponent } from './held/held-geld/held-geld.component';
import {HeldGeldService} from './held/held-geld/held-geld.service';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {path: 'abenteuer', loadChildren: './abenteuer/abenteuer.module#AbenteuerModule'},
  { path: 'administration/user', component: NutzerVerwaltungComponent, data: {title: 'Nutzer-Verwaltung'}},
  { path: 'administration/export', component: FullExportComponent, data: {title: 'Export'}},
  { path: 'administration/import', component: FullImportComponent, data: {title: 'Import'}},
  { path: 'administration/meister', component: MeisterVerwaltungComponent, data: {title: 'Import'}},
  { path: 'helden', component: MeineHeldenComponent, data: {title: 'Meine Helden'}},
  { path: 'gruppen', component: GroupviewComponent, data: {title: 'Öffentliche Helden'}},
  { path: 'held/uebersicht', component: HeldUebersichtComponent, data: {title: 'Übersicht'}},
  { path: 'held/ereignisse', component: HeldEreignisseComponent, data: {title: 'Ereignisse'}},
  { path: 'held/talente', component: HeldTalenteComponent, data: {title: 'Talente'}},
  { path: 'held/zauber', component: HeldZauberComponent, data: {title: 'Zauber'}},
  { path: 'held/inventar', component: HeldInventarComponent, data: {title: 'Inventar'}},
  { path: 'held/steigern', component: HeldSteigernComponent, data: {title: 'Steigern'}},
  { path: 'held/geld', component: HeldGeldComponent, data: {title: 'Geld'}},
  { path: 'kalender', component: CalendarComponent, data: {title: 'Kalender'}},
  { path: 'scripts', component: SkriptComponent, data: {title: 'Skripte'}},
  { path: 'scripts/:id', component: SkriptRoutingComponent, data: {title: 'Skripte'}},
  { path: 'held/vergleichen/:id/:from/:to', component: HeldVergleichComponent, data: {title: 'Vergleichen'}},

  { path: '**', redirectTo : '/home' }
];

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: './assets', // configure base path for monaco editor
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
};

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
    HeldenInfoTabelleComponent,
    HeldUebersichtComponent,
    AlteVersionLadenDialogComponent,
    HeldEreignisseComponent,
    HeldTalenteComponent,
    HeldZauberComponent,
    PdfComponent,
    GroupviewComponent,
    HeldVergleichComponent,
    CalendarComponent,
    SkriptComponent,
    AlteVersionHochladenComponent,
    FullExportComponent,
    FullImportComponent,
    MeisterVerwaltungComponent,
    CurrentHeldComponent,
    SelectGruppeDialogComponent,
    ResultDisplayComponent,
    TextResultComponent,
    TableResultComponent,
    SkriptRoutingComponent,
    HeldSteigernComponent,
    HeldInventarComponent,
    HeldQuicknavComponent,
    HeldGeldComponent
  ],
  imports: [
    BrowserAnimationsModule, MultiSelectModule, FileUploadModule, InputSwitchModule, PanelMenuModule, KeyFilterModule,
    BrowserModule, DialogModule, MessageModule, PanelModule, GrowlModule, ReactiveFormsModule, FormsModule, MenuModule, TabMenuModule,
    HttpClientModule, ButtonModule, CheckboxModule, TablesModule, DropdownModule, EditDsaDateModule,
    AccordionModule, PdfViewerModule, InputTextModule, InputTextareaModule, TooltipModule, TableModule,
    MonacoEditorModule.forRoot(monacoConfig),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ), CardModule, SidebarModule,

  ],
  providers: [AuthenticationService, RestService, MessageService, VersionService, SessionService, HeldenService, UserService, HeldGeldService,
    GruppenService, MenuService, RoutingService, AbenteuerService, AdministrationService
    , { provide: LOCALE_ID, useValue: 'de' }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
