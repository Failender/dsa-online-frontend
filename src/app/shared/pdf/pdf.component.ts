import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  @Input('options')
  public pdfOptions;

  constructor() { }

  ngOnInit() {
  }

  download() {
    this.openWindowWithGet(this.pdfOptions.url, this.pdfOptions.httpHeaders);
  }


  openWindowWithGet(url, data) {
    url += `?username=${data.username}&password=${data.password}`
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", url);
    iframe.setAttribute("style", "display: none");
    document.body.appendChild(iframe);
  }

}
