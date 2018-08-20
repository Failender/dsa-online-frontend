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
import {AuthenticationService, init} from './service/authentication/authentication.service';
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
import {HeldenService} from './meine-helden/helden.service';
import { HeldUebersichtComponent } from './held/held-uebersicht/held-uebersicht.component';
import { HeldEreignisseComponent } from './held/held-ereignisse/held-ereignisse.component';
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
import { SelectGruppeDialogComponent } from './shared/helden-info-tabelle/select-gruppe-dialog/select-gruppe-dialog.component';
import { ResultDisplayComponent } from './skripte/result-display/result-display.component';
import { TextResultComponent } from './skripte/result-display/text-result/text-result.component';
import { TableResultComponent } from './skripte/result-display/table-result/table-result.component';
import { KampagnenComponent } from './kampagnen/kampagnen.component';
import { AdminKampagneComponent } from './Administration/admin-kampagne/admin-kampagne.component';
import { KampagneComponent } from './kampagne-component/kampagne.component';
import { AbenteuerAnzeigenComponent } from './abenteuer/abenteuer-anzeigen/abenteuer-anzeigen.component';
import { AbenteuerTabelleComponent } from './shared/abenteuer-tabelle/abenteuer-tabelle.component';
import { AddSeBonusDialogComponent } from './abenteuer/abenteuer-anzeigen/add-se-bonus-dialog/add-se-bonus-dialog.component';
import { AddApBonusDialogComponent } from './abenteuer/abenteuer-anzeigen/add-ap-bonus-dialog/add-ap-bonus-dialog.component';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {path: 'kampagnen', component: KampagnenComponent},
  {path: 'kampagne/:id', component: KampagneComponent},
  {path: 'administration/kampagnen', component: AdminKampagneComponent},
  { path: 'administration/user', component: NutzerVerwaltungComponent, data: {title: 'Nutzer-Verwaltung'}},
  { path: 'administration/export', component: FullExportComponent, data: {title: 'Export'}},
  { path: 'administration/import', component: FullImportComponent, data: {title: 'Import'}},
  { path: 'administration/meister', component: MeisterVerwaltungComponent, data: {title: 'Import'}},
  { path: 'administration/abenteuer', component: AbenteuerErstellenComponent, data: {title: 'Abenteuer erstellen'}},
  { path: 'helden', component: MeineHeldenComponent, data: {title: 'Meine Helden'}},
  { path: 'gruppen', component: OeffentlicheHeldenComponent, data: {title: 'Öffentliche Helden'}},
  { path: 'held/uebersicht', component: HeldUebersichtComponent, data: {title: 'Übersicht'}},
  { path: 'held/ereignisse', component: HeldEreignisseComponent, data: {title: 'Ereignisse'}},
  { path: 'held/talente', component: HeldTalenteComponent, data: {title: 'Talente'}},
  { path: 'held/zauber', component: HeldZauberComponent, data: {title: 'Zauber'}},
  { path: 'kalender', component: DsaKalenderComponent, data: {title: 'Kalender'}},
  { path: 'scripts', component: SkriptComponent, data: {title: 'Skripte'}},
  { path: 'abenteuer', component: AbenteuerlogComponent, data: {title: 'Abenteuerlog'}},
  { path: 'abenteuer/:id', component: AbenteuerAnzeigenComponent, data: {title: 'Abenteuerlog'}},
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
    DsaKalenderComponent,
    SkriptComponent,
    AlteVersionHochladenComponent,
    AbenteuerlogComponent,
    AbenteuerErstellenComponent,
    FullExportComponent,
    FullImportComponent,
    MeisterVerwaltungComponent,
    CurrentHeldComponent,
    SelectGruppeDialogComponent,
    KampagnenComponent,
    AdminKampagneComponent,
    KampagneComponent,
    AbenteuerAnzeigenComponent,
    AbenteuerTabelleComponent,
    AddSeBonusDialogComponent,
    AddApBonusDialogComponent,
    ResultDisplayComponent,
    TextResultComponent,
    TableResultComponent,
  ],
  imports: [
    BrowserAnimationsModule, MultiSelectModule, FileUploadModule, InputSwitchModule, PanelMenuModule, TreeTableModule,
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
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      multi: true,
      deps: [AuthenticationService, GruppenService]
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
