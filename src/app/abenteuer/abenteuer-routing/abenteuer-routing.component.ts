import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {AbenteuerDto, AbenteuerService} from "../abenteuer.service";
import {RoutingService} from "../../shared/routing.service";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {MessageService} from "../../service/message/message.service";

@Component({
  selector: 'app-abenteuer-routing',
  templateUrl: './abenteuer-routing.component.html',
  styleUrls: ['./abenteuer-routing.component.css']
})
export class AbenteuerRoutingComponent implements OnInit, OnDestroy {

  @Input()
  public abenteuer: AbenteuerDto;

  private sub;

  public addSeGruppeid: number = null;
  public addNoteGruppeid : number = null;
  public addApGruppeid: number = null;
  public addLmGruppeid: number = null;


  constructor(private activatedRoute: ActivatedRoute, private abenteuerService: AbenteuerService,
              private router: RoutingService, private messageService: MessageService,
              private authenticationService: AuthenticationService) { }


  ngOnInit() {

    this.activatedRoute.params.subscribe(data => this.loadAbenteuer(data.id));

    this.sub = this.authenticationService.onLogin.subscribe(() => {
      if (this.abenteuer) {
        this.loadAbenteuer(this.abenteuer.id);
      }
    });
  }

  back() {
    this.router.navigateByUrl("abenteuer");
  }

  private loadAbenteuer(id) {
    this.abenteuerService.getAbenteuer(id)
      .subscribe(data => this.abenteuer = data);
  }

  backToKampagne() {
    this.router.navigateByUrl("kampagne/" + this.abenteuer.kampagneId);
  }

  backToCreate() {
    this.router.navigateByUrl("administration/abenteuer");
  }

  onAddSeDialogClose(reload: boolean) {
    if (reload) {
      this.loadAbenteuer(this.abenteuer.id);
    }
    this.addSeGruppeid = null;
  }

  onAddNoteDialogClose(reload: boolean) {
    if (reload) {
      this.loadAbenteuer(this.abenteuer.id);
    }
    this.addNoteGruppeid = null;
  }

  onAddLmDialogClose(reload: boolean) {
    if (reload) {
      this.loadAbenteuer(this.abenteuer.id);
    }
    this.addLmGruppeid = null;
  }

  onAddApDialogClose(reload: boolean) {
    if (reload) {
      this.loadAbenteuer(this.abenteuer.id);
    }
    this.addApGruppeid = null;
  }

  reload() {
    this.loadAbenteuer(this.abenteuer.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  viewInCalendar() {
    if (this.abenteuer) {
      this.router.navigateByUrl('/kalender?date=' + this.abenteuer.datumValue);
    }
  }

  copyToClipboard() {
    const val = this.abToString();
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  abToString() {

    let s = "";
    s += this.abenteuer.name;
    s += "\n";
    s +=  "Abenteuerpunkte: "
    s += this.abenteuer.bonusAll.ap;
    s += "\n";
    s = this.appendToAbString("Spezielle Erfahrungen", this.abenteuer.bonusAll.ses, s);
    s += "\n";

    this.abenteuer.bonus.forEach(bonus => {
      s += bonus.name;
      s += "\n";
      if (bonus.bonus.ap !== 0) {
        s += "Bonus-AP: " + bonus.bonus.ap;
        s += "\n";
      }
      s = this.appendToAbString("SE's", bonus.bonus.ses, s);
      s = this.appendToAbString("LM's", bonus.bonus.lms, s);
      s += "\n";
    })
    return s;
  }

  appendToAbString(title: string, entries: string[], s: string) {
    if (entries.length !== 0) {
      s += title;
      s += "\n";
      entries.forEach(entry =>  {
        s += entry;
        s += "\n";
      });
    }

    return s;
  }

}
