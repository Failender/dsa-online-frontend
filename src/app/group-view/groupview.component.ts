import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthenticationService} from '../shared/service/authentication/authentication.service';
import {GruppeIncludingHeld, GruppenService} from '../shared/gruppen.service';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, mergeMap, tap} from "rxjs/internal/operators";
import {BehaviorSubject, Subscription} from "rxjs/index";

@Component({
  selector: 'app-group-view',
  templateUrl: './groupview.component.html',
  styleUrls: ['./groupview.component.css']
})
export class GroupviewComponent implements OnInit, OnDestroy {



  public activeIndex = null;
  public gruppen: GruppeIncludingHeld[];
  public gruppe: GruppeIncludingHeld;

  private publicOnly = true;
  private showInactive = false;

  private subs: Subscription[] = [];

  public isMeisterGruppe = false;
  public loading = false;
  private loadSubject = new BehaviorSubject<void>(null);
  private publicOnlySubject = new BehaviorSubject<boolean>(this.publicOnly);
  private showInactiveSubject = new BehaviorSubject<boolean>(this.showInactive);

  constructor(private gruppenService: GruppenService, private authenticationService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadGruppen();

    this.subs.push(this.gruppenService.getCurrentGroup()
      .pipe(tap((data) => this.isMeisterGruppe = data.meister), combineLatest(this.publicOnlySubject.asObservable(), this.showInactiveSubject.asObservable(), this.loadSubject.asObservable()), tap(() => this.loading = true))
        .pipe(mergeMap(data => this.gruppenService.getGruppeIncludingHeld(data[0].id, data[1], data[2])), tap(() => this.loading = false))
      .subscribe(data => {
        this.gruppe = data;

      }));
    this.activatedRoute.queryParams.subscribe((data) => this.activeIndex = parseInt(data.gruppe, 10));

  }

  loadGruppen() {
    this.loadSubject.next(null);
      // this.gruppenService.getGruppenIncludingHeld(this.publicOnly, this.showInactive)
      //   .subscribe((data) => this.gruppen = data);
  }

  onPublicChange(event) {
    this.publicOnly = event.checked;
    this.publicOnlySubject.next(event.checked);
  }

  onActiveChange(event) {
    this.showInactive = !event.checked;
    this.showInactiveSubject.next(event.checked);
  }

  get canViewAll(): boolean {
    return this.authenticationService.rights.indexOf('VIEW_ALL') !== -1;
  }

  get editHelden() {
    return this.isMeisterGruppe || this.authenticationService.rights.indexOf('EDIT_ALL') !== -1;
  }

  forceReload() {
    console.debug('rl')
    this.loadGruppen();
  }

  onOpen(event) {
    this.activeIndex = event.index;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        gruppe: this.activeIndex
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }


}
