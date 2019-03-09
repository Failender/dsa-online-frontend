import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditDsaDateComponent} from "./edit-dsa-date.component";
import {FormsModule} from "@angular/forms";
import {ButtonModule, Dropdown, DropdownModule} from "primeng/primeng";

@NgModule({
  declarations: [EditDsaDateComponent],
  imports: [
    CommonModule, FormsModule, DropdownModule, ButtonModule
  ],
  exports: [EditDsaDateComponent]
})
export class EditDsaDateModule { }
