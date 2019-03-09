import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TableModule} from "primeng/table";
import {EreignisseTabelleComponent} from "./ereignisse-tabelle/ereignisse-tabelle.component";
import {TalenteTabelleComponent} from "./talente-tabelle/talente-tabelle.component";
import {ZauberTabelleComponent} from "./zauber-tabelle/zauber-tabelle.component";
import {FavoritenTabelleComponent} from "./favoriten-tabelle/favoriten-tabelle.component";

@NgModule({
  declarations: [EreignisseTabelleComponent, TalenteTabelleComponent, ZauberTabelleComponent, FavoritenTabelleComponent],
  imports: [
    CommonModule, TableModule
  ],
  exports: [EreignisseTabelleComponent, TalenteTabelleComponent, ZauberTabelleComponent, FavoritenTabelleComponent]
})
export class TablesModule {

}
