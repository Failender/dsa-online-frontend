import {NgModule} from "@angular/core";
import {KampfRoutingComponent} from './kampf-routing/kampf-routing.component';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: '', component: KampfRoutingComponent}
]

@NgModule({

  imports: [RouterModule.forChild(routes)],
  declarations: [KampfRoutingComponent]
})
export class KampfModule {

}
