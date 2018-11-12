import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {KampagnenService} from "../kampagnen.service";
import {GruppenService} from "../../shared/gruppen.service";
import {flatMap} from "rxjs/operators";
import {tap} from "rxjs/internal/operators";
import {RoutingService} from "../../shared/routing.service";

@Component({
  selector: 'app-kampagnen',
  templateUrl: './kampagnen.component.html',
  styleUrls: ['./kampagnen.component.css']
})
export class KampagnenComponent implements OnInit, OnDestroy {


  @Input() public delete = false;

  public kampagne;

  public kampagnen: any[];
  public loading = false;
  public sub;

  constructor(private kampagneService: KampagnenService, private gruppenService: GruppenService, private router: RoutingService) { }

  ngOnInit() {
    this.sub = this.gruppenService.getCurrentGroup().pipe(tap(() => this.loading = true),
       flatMap(gruppe => this.kampagneService.getKampagnen(gruppe.id)),
      tap(() => this.loading = false))
      .subscribe(data => this.kampagnen = data);
  }

  deleteKampagne(id) {
    this.kampagneService.deleteKampagne(id)
      .subscribe(() => this.gruppenService.forceRefresh());
  }

  openKampagne(id) {
    this.kampagne = id;
    // this.router.navigateByUrl(`kampagne/${id}`);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
