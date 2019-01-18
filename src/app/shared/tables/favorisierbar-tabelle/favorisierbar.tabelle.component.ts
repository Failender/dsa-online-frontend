import {EventEmitter, Input, Output} from "@angular/core";

export abstract class FavorisierbarTabelleComponent {

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
