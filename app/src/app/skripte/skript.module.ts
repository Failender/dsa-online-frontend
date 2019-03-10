import {NgModule} from "@angular/core";
import {SkriptComponent} from "./skript/skript.component";
import {SkriptRoutingComponent} from "./skript-routing/skript-routing.component";
import {RouterModule, Routes} from "@angular/router";
import {TableResultComponent} from "./result-display/table-result/table-result.component";
import {TextResultComponent} from "./result-display/text-result/text-result.component";
import {ResultDisplayComponent} from "./result-display/result-display.component";
import {CardModule} from "primeng/card";
import {ButtonModule, DropdownModule, MultiSelectModule, PanelModule, TooltipModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor";
import {TableModule} from "primeng/table";


const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: './assets', // configure base path for monaco editor
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
};

const routes: Routes = [
  { path: '', component: SkriptComponent, data: {title: 'Skripte'}},
  { path: ':id', component: SkriptRoutingComponent, data: {title: 'Skripte'}},
]
@NgModule({

  imports: [
    RouterModule.forChild(routes), CardModule, DropdownModule, FormsModule,
    MultiSelectModule, TooltipModule, CommonModule, MonacoEditorModule.forRoot(monacoConfig),
    PanelModule, TableModule, ButtonModule
  ],
  declarations: [
    SkriptComponent,
    SkriptRoutingComponent,
    ResultDisplayComponent,
    TextResultComponent,
    TableResultComponent,

  ]
})
export class SkriptModule {

}
