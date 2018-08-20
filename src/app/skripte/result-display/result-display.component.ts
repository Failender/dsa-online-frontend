import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css']
})
export class ResultDisplayComponent implements OnInit {


  @Input()
  public result: any;

  constructor() { }

  ngOnInit() {
  }

}
