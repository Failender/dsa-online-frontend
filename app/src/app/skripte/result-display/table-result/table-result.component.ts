import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-table-result',
  templateUrl: './table-result.component.html',
  styleUrls: ['./table-result.component.css']
})
export class TableResultComponent implements OnInit {

  @Input()
  public result: any;

  constructor() { }

  ngOnInit() {
  }

}
