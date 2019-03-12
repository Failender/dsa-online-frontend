import {NgModule} from "@angular/core";
import {KampfRoutingComponent} from './kampf-routing/kampf-routing.component';
import {RouterModule, Routes} from "@angular/router";
import {ButtonModule} from "primeng/button";


const routes: Routes = [
  {path: '', component: KampfRoutingComponent}
]

@NgModule({

  imports: [RouterModule.forChild(routes),  ButtonModule],
  declarations: [KampfRoutingComponent]
})
export class KampfModule {

}
