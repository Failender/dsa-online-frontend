import {Component, Input} from '@angular/core';
import {FavorisierbarTabelleComponent} from "../favorisierbar-tabelle/favorisierbar.tabelle.component";

@Component({
  selector: 'app-favoriten-tabelle',
  templateUrl: './favoriten-tabelle.component.html',
  styleUrls: ['./favoriten-tabelle.component.css']
})
export class FavoritenTabelleComponent extends FavorisierbarTabelleComponent {


  @Input() public displayProbeFull = false;
}
