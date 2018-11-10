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
    const form = document.createElement('form');
    form.target = '_blank';
    form.method = 'GET';
    form.action = url;
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

}
