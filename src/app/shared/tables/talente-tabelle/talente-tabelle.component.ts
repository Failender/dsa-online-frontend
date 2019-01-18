import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-talente-tabelle',
  templateUrl: './talente-tabelle.component.html',
  styleUrls: ['./talente-tabelle.component.css']
})
export class TalenteTabelleComponent implements OnInit {

  @Input()
  public data: any[];

  @Input()
  public favoriten: { [key: string]: number; } = {};

  @Input()
  public allowAddFavorites = false;

  @Output()
  public favoriteAdded = new EventEmitter<string>();

  @Output()
  public favoriteRemoved = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  isFavorisiert(name) {
    return this.favoriten[name];
  }

  changeFavorite(data) {
    if (this.isFavorisiert(data.name)) {
      this.favoriteRemoved.next(data.name);
    } else {
      this.favoriteAdded.next(data.name);
    }
  }

}
