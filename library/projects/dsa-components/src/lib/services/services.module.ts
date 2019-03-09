import {ModuleWithProviders, NgModule} from "@angular/core";
import {RestService} from "./rest.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@NgModule({
  providers: [],
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule]
})
export class ServicesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [RestService]
    }
  }
}
