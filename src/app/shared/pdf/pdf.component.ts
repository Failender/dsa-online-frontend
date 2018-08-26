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
    const form = document.createElement('form');
    form.target = '_blank';
    form.method = 'GET';
    form.action = url;
    form.style.display = 'none';

    for (const key in data) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

}
