import {Component, OnInit} from '@angular/core';
import {ScriptHelperInformation, Skript, SkriptService, SkriptVariable} from '../skript.service';
import {SelectItem} from "primeng/api";
import {MessageService} from '../../service/message/message.service';
import {RoutingService} from "../../shared/routing.service";

@Component({
  selector: 'app-skript',
  templateUrl: './skript.component.html',
  styleUrls: ['./skript.component.css']
})
export class SkriptComponent implements OnInit {


  public loading = false;
  public skriptSelect: SelectItem[];
  public types: any;
  public resultTypes: any;
  public typesSelect: SelectItem[];
  public helperSelect: SelectItem[];

  private helperInformation: ScriptHelperInformation[];

  public typesMap: { [key: string]: any; } = {};

  public editorOptions = {theme: 'vs-light', language: 'javascript'};

  public testResult = null;

  public selectedType: any;

  public current: Skript = {
    body: '',
    id: null,
    name: '',
    scriptVariables: [],
    scriptHelper: [],
    resultType: null
  };

  constructor(private skriptService: SkriptService, private messageService: MessageService, private router: RoutingService) { }

  ngOnInit() {
    this.skriptService.getSkripte()
      .subscribe((data) => this.skriptSelect = data.map(val => ({value: val, label: val.name})));

    this.skriptService.getResultTypes()
      .subscribe(data => this.resultTypes = data);
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

    this.skriptService.getScriptHelperInformations()
      .subscribe(data => this.helperInformation = data);
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
    if(!this.current.body) {
      this.messageService.info('Bitte ein Skript erstellen')
      return;
    }
    // TODO: Validate
    this.loading = true;
    this.skriptService.test(this.current)
      .subscribe((data) => {
        this.testResult = data;
        this.loading = false;
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

  open() {
    this.router.navigateByUrl('scripts/' + this.current.id);
  }

  onInit(event) {
    const monaco = window['monaco'];
    //monaco.languages.registerCompletionItemProvider('javascript', this.getCompletionProvider(monaco));
  }

  getCompletionProvider(monaco) {

  }



}
