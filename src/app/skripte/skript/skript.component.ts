import { Component, OnInit } from '@angular/core';
import {Skript, SkriptService} from "../skript.service";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-skript',
  templateUrl: './skript.component.html',
  styleUrls: ['./skript.component.css']
})
export class SkriptComponent implements OnInit {


  public skripte: Skript[];
  public types: any;
  public typesSelect: SelectItem[];

  public selectedType: any;

  public current: Skript = {
    body: '',
    id: null,
    name: '',
    scriptVariables: []
  };

  constructor(private skriptService: SkriptService) { }

  ngOnInit() {
    this.skriptService.getSkripte()
      .subscribe((data) => this.skripte = data);

    this.skriptService.getTypes()
      .subscribe((data) => {
        this.types = data;
        this.typesSelect = data.map(val => { return {label: val.name, value: val}; } )
      });
  }

  addVariable() {
    console.debug(this.selectedType)
  }

}
