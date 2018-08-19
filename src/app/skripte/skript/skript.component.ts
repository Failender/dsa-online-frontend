import { Component, OnInit } from '@angular/core';
import {Skript, SkriptService, SkriptVariable} from '../skript.service';
import {SelectItem} from "primeng/api";
import {MessageService} from '../../service/message/message.service';

@Component({
  selector: 'app-skript',
  templateUrl: './skript.component.html',
  styleUrls: ['./skript.component.css']
})
export class SkriptComponent implements OnInit {


  public skriptSelect: SelectItem[];
  public types: any;
  public typesSelect: SelectItem[];
  public helperSelect: SelectItem[];

  public typesMap: { [key: string]: any; } = {};


  public testResult = null;

  public selectedType: any;

  public current: Skript = {
    body: '',
    id: null,
    name: '',
    scriptVariables: [],
    scriptHelper: []
  };

  constructor(private skriptService: SkriptService, private messageService: MessageService) { }

  ngOnInit() {
    this.skriptService.getSkripte()
      .subscribe((data) => this.skriptSelect = data.map(val => ({value: val, label: val.name})));

    this.skriptService.getTypes()
      .subscribe((data) => {
        this.types = data;
        this.typesSelect = data.map(val => { return {label: val.name, value: val}; } )
        const _data = JSON.parse(JSON.stringify(data));
        _data.forEach( val => {
          this.typesMap[val.name] = val.values;
        });
      });
    this.skriptService.getHelper()
      .subscribe(data => this.helperSelect = data.map(v => ({label: v.name, value: v.name})));
  }

  valuesFor(variable: SkriptVariable) {

    return this.typesMap[variable.type];
  }

  addVariable() {
    if (this.selectedType) {
      this.current.scriptVariables.push({
        name: '',
        type: this.selectedType.name,
        value: null
      });
    } else {
      this.messageService.info('Bitte einen Typ auswählen');
    }
  }

  testrun() {
    //TODO: Validate
    this.skriptService.test(this.current)
      .subscribe((data) => {
        this.testResult = data;
      });
  }

  save() {
    this.skriptService.save(this.current)
      .subscribe((data) => {
        this.current.id = data;
        this.messageService.info('Gespeichert');
      });
  }

  onSkriptSelect(event) {
    this.current = event.value;
  }

  deleteVariable(i) {
    this.current.scriptVariables.splice(i,1);
  }

}
