import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from "@angular/core";


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
  MultiSelectModule,
  PanelMenuModule,
  SidebarModule,
  TabMenuModule,
  TooltipModule,
  TreeTableModule
} from "primeng/primeng";
import {AuthenticationService, init} from './shared/service/authentication/authentication.service';
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
import {EreignisseTabelleComponent} from './shared/tables/ereignisse-tabelle/ereignisse-tabelle.component';
import {TalenteTabelleComponent} from './shared/tables/talente-tabelle/talente-tabelle.component';
import {ZauberTabelleComponent} from './shared/tables/zauber-tabelle/zauber-tabelle.component';
import {CalendarComponent} from './dsa-calendar/calendar.component';
import {SkriptComponent} from './skripte/skript/skript.component';
import {DialogModule} from "primeng/dialog";
import {AlteVersionHochladenComponent} from './shared/alte-version-hochladen/alte-version-hochladen.component';
import {VersionService} from "./shared/alte-version-laden-dialog/version.service";
import {AbenteuerlogComponent} from './abenteuer/abenteuerlog/abenteuerlog.component';
import {AbenteuerErstellenComponent} from './abenteuer/abenteuer-erstellen/abenteuer-erstellen.component';
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
import {AdminKampagneComponent} from './administration/admin-kampagne/admin-kampagne.component';
import {AbenteuerAnzeigenComponent} from './abenteuer/abenteuer-anzeigen/abenteuer-anzeigen.component';
import {AbenteuerTabelleComponent} from './shared/tables/abenteuer-tabelle/abenteuer-tabelle.component';
import {AddSeBonusDialogComponent} from './abenteuer/abenteuer-anzeigen/add-se-bonus-dialog/add-se-bonus-dialog.component';
import {AddApBonusDialogComponent} from './abenteuer/abenteuer-anzeigen/add-ap-bonus-dialog/add-ap-bonus-dialog.component';
import {CampaignComponent} from "./campaign/campaign/campaign.component";
import {CampaignRoutingComponent} from './campaign/campaign-routing/campaign-routing.component';
import {CampaignDialogComponent} from './campaign/campaign-dialog/campaign-dialog.component';
import {AbenteuerRoutingComponent} from './abenteuer/abenteuer-routing/abenteuer-routing.component';
import {AbenteuerDialogComponent} from './abenteuer/abenteuer-dialog/abenteuer-dialog.component';
import {AddLmBonusDialogComponent} from "./abenteuer/abenteuer-anzeigen/add-lm-bonus-dialog/add-lm-bonus-dialog.component";
import {AddNoteBonusDialogComponent} from "./abenteuer/abenteuer-anzeigen/add-note-bonus-dialog/add-note-bonus-dialog.component";
import {NgxMasonryModule} from "ngx-masonry";
import {SkriptRoutingComponent} from './skripte/skript-routing/skript-routing.component';
import {EditDsaDateComponent} from './dsa-calendar/edit-dsa-date/edit-dsa-date.component';
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor";
import {CampaignsComponent} from "./campaign/campaigns/campaigns.component";


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {path: 'kampagnen', component: CampaignComponent},
  {path: 'kampagne/:id', component: CampaignRoutingComponent},
  {path: 'administration/kampagnen', component: AdminKampagneComponent},
  { path: 'administration/user', component: NutzerVerwaltungComponent, data: {title: 'Nutzer-Verwaltung'}},
  { path: 'administration/export', component: FullExportComponent, data: {title: 'Export'}},
  { path: 'administration/import', component: FullImportComponent, data: {title: 'Import'}},
  { path: 'administration/meister', component: MeisterVerwaltungComponent, data: {title: 'Import'}},
  { path: 'administration/abenteuer', component: AbenteuerErstellenComponent, data: {title: 'Abenteuer erstellen'}},
  { path: 'helden', component: MeineHeldenComponent, data: {title: 'Meine Helden'}},
  { path: 'gruppen', component: GroupviewComponent, data: {title: 'Öffentliche Helden'}},
  { path: 'held/uebersicht', component: HeldUebersichtComponent, data: {title: 'Übersicht'}},
  { path: 'held/ereignisse', component: HeldEreignisseComponent, data: {title: 'Ereignisse'}},
  { path: 'held/talente', component: HeldTalenteComponent, data: {title: 'Talente'}},
  { path: 'held/zauber', component: HeldZauberComponent, data: {title: 'Zauber'}},
  { path: 'kalender', component: CalendarComponent, data: {title: 'Kalender'}},
  { path: 'scripts', component: SkriptComponent, data: {title: 'Skripte'}},
  { path: 'scripts/:id', component: SkriptRoutingComponent, data: {title: 'Skripte'}},
  { path: 'abenteuer', component: AbenteuerlogComponent, data: {title: 'Abenteuerlog'}},
  { path: 'abenteuer/:id', component: AbenteuerRoutingComponent, data: {title: 'Abenteuerlog'}},
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
    EreignisseTabelleComponent,
    TalenteTabelleComponent,
    ZauberTabelleComponent,
    CalendarComponent,
    SkriptComponent,
    AlteVersionHochladenComponent,
    AbenteuerlogComponent,
    AbenteuerErstellenComponent,
    FullExportComponent,
    FullImportComponent,
    MeisterVerwaltungComponent,
    CurrentHeldComponent,
    SelectGruppeDialogComponent,
    AdminKampagneComponent,
    CampaignComponent,
    CampaignsComponent,
    AbenteuerAnzeigenComponent,
    AbenteuerTabelleComponent,
    AddSeBonusDialogComponent,
    AddApBonusDialogComponent,
    AddNoteBonusDialogComponent,
    AddLmBonusDialogComponent,
    ResultDisplayComponent,
    TextResultComponent,
    TableResultComponent,
    CampaignRoutingComponent,
    CampaignDialogComponent,
    AbenteuerRoutingComponent,
    AbenteuerDialogComponent,
    SkriptRoutingComponent,
    EditDsaDateComponent,
  ],
  imports: [
    BrowserAnimationsModule, MultiSelectModule, FileUploadModule, InputSwitchModule, PanelMenuModule, TreeTableModule,
    BrowserModule, DialogModule, MessageModule, PanelModule, GrowlModule, ReactiveFormsModule, FormsModule, MenuModule, TabMenuModule,
    HttpClientModule, ButtonModule, CheckboxModule, TableModule, DropdownModule, NgxMasonryModule,
    AccordionModule, PdfViewerModule, InputTextModule, InputTextareaModule, TooltipModule,
    MonacoEditorModule.forRoot(monacoConfig),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ), CardModule, SidebarModule,

  ],
  providers: [AuthenticationService, RestService, MessageService, VersionService, SessionService, HeldenService, UserService,
    GruppenService, MenuService, RoutingService, AbenteuerService, AdministrationService
    , { provide: LOCALE_ID, useValue: 'de' }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
