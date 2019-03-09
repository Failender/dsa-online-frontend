import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-text-result',
  templateUrl: './text-result.component.html',
  styleUrls: ['./text-result.component.css']
})
export class TextResultComponent implements OnInit {


  @Input()
  public result: any;
  constructor() { }

  ngOnInit() {
  }

}
