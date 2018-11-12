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
  public addApGruppeid: number = null;


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

}
