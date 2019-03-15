import {NgModule} from "@angular/core";
import {KampfRoutingComponent} from './kampf-routing/kampf-routing.component';
import {RouterModule, Routes} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {KampfService} from "./kampf.service";
import { KampfErstellenComponent } from './kampf-erstellen/kampf-erstellen.component';
import { KampfRenderComponent } from './kampf-render/kampf-render.component';
import {CommonModule} from "@angular/common";
import {AbenteuerSharedModule} from "../shared/abenteuer/abenteuer.shared.module";


const routes: Routes = [
  {path: '', component: KampfRoutingComponent},
  {path: 'erstellen', component: KampfErstellenComponent}
]

@NgModule({

  imports: [RouterModule.forChild(routes),  ButtonModule, CommonModule, AbenteuerSharedModule],
  declarations: [KampfRoutingComponent, KampfErstellenComponent, KampfRenderComponent],
  providers: [KampfService]
})
export class KampfModule {

}
