import {Component} from '@angular/core';
import {HeldenComponent} from '../helden-component/helden-component.component';
import {HeldenService} from '../../meine-helden/helden.service';
import {RoutingService} from "../../shared/routing.service";
import {SortEvent} from "primeng/api";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";

@Component({
  selector: 'app-held-ereignisse',
  templateUrl: './held-ereignisse.component.html',
  styleUrls: ['./held-ereignisse.component.css']
})
export class HeldEreignisseComponent extends HeldenComponent {

  public zauberButton = false;

  constructor(heldenService: HeldenService, router: RoutingService, authenticationService: AuthenticationService) {
    super(heldenService, router, authenticationService);
  }

  init() {
    this.zauberButton = this.held.zauberliste.zauber.length !== 0;
  }

  public getChange(data: any) {
    if (data.alterzustand === 0 || data.alterzustand && (data.neuerzustand !== 0 || data.alterzustand !== 0 )) {
      return data.alterzustand + '->' + data.neuerzustand;
    }
    return '';
  }

  public customSort(event: SortEvent) {
    if (event.field === 'date') {
      event.data.sort((data1, data2) => {
        return event.order * (data2.date - data1.date);
      });
    }

  }

  uebersicht() {
    this.routingService.navigateByUrl('held/uebersicht');
  }

  zauber(){
    this.routingService.navigateByUrl('held/zauber');
  }


}
