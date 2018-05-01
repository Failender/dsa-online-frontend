import {Component, Input, OnInit} from '@angular/core';
import {HeldenInfo, HeldenService} from '../../meine-helden/helden.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-helden-info-tabelle',
  templateUrl: './helden-info-tabelle.component.html',
  styleUrls: ['./helden-info-tabelle.component.css']
})
export class HeldenInfoTabelleComponent implements OnInit {

  @Input()
  public data: HeldenInfo[];

  constructor(private router: Router, private heldenService: HeldenService) { }

  ngOnInit() {
  }

  heldLaden(held: HeldenInfo) {
    const sub = this.heldenService.heldLoaded.subscribe(
      () => {
        sub.unsubscribe();
        this.router.navigateByUrl('held/zauber');
      }
    )
    this.heldenService.loadHeld(held.id);
  }

}
