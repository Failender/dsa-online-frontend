import {Component, NgZone} from '@angular/core';
import {HeldenService} from "../../meine-helden/helden.service";
import {HeldenComponent} from "../helden-component/helden-component.component";
import {RoutingService} from "../../shared/routing.service";
import {AuthenticationService} from "../../shared/service/authentication/authentication.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-held-mobil',
  templateUrl: './held-mobil.component.html',
  styleUrls: ['./held-mobil.component.css']
})
export class HeldMobilComponent extends HeldenComponent {

  public data;

  public speechData = [];

  private recognition;

  public eigenschaften = [
    {name: "mut", short: "MU"},
    {name: "klugheit", short: "KL"},
    {name: "intuition", short: "IN"},
    {name: "charisma", short: "CH"},
    {name: "fingerfertigkeit", short: "FF"},
    {name: "gewandtheit", short: "GE"},
    {name: "konstitution", short: "KO"},
    {name: "koerperkraft", short: "KK"},
    {name: "sozialstatus", short: "SO"},
    {name: "magieresistenz", short: "MR"},
    {name: "geschwindigkeit", short: "GS"}];

  public displayProbeFull = true

  constructor(heldenService: HeldenService, router: RoutingService, authenticationService: AuthenticationService, private zone: NgZone) {
    super(heldenService, router, authenticationService);
  }

  init() {
    this.heldenService.getFavoriten(this.versioninfo.id)
      .pipe(map(data => {
        data.forEach(entry => entry.probeFull = this.mapProbe(entry.probe))
        return data;
      }))
      .subscribe(data => this.data = data);
    this.setupVoiceRecognition();

  }

  private setupVoiceRecognition() {
    const SpeechRecognition = window['SpeechRecognition'] || window['webkitSpeechRecognition'];
    this.recognition = new SpeechRecognition();
    this.recognition.lang = "de-DE";
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
    this.recognition.onresult = event => {

      const last = event.results.length - 1;
      const result = event.results[last][0].transcript;

      let bestHit = this.held.talentliste.talent[0];
      let bestHitMatch = 0;
      this.held.talentliste.talent.forEach(talent => {
        const similarity = this.similarity(result, talent.name);
        if (similarity > bestHitMatch) {
          bestHitMatch = similarity;
          bestHit = talent;
        }
      });
      console.debug(bestHit)
      this.zone.run(() => {
        this.speechData.push(bestHit);

      })

    }
  }

  public recognize() {
    this.recognition.start();
    window.setTimeout(() => this.recognition.stop(), 2000);
  }

  addFavorite(data) {
  }

  private mapProbe(probe) {
    if(!probe || probe.indexOf('-') !== -1) {
      return null;
    }
    const splits = probe.split("/");

    const values = [];
    splits.forEach(split => {
      if(split === "**") {
        values.push(split);
        return;
      }
      const eigenschaft = this.eigenschaften.find(val => val.short === split);
      if (!eigenschaft) {
        console.error('Unrecognized split', split);
      }
      values.push(this.held.eigenschaften[eigenschaft.name].akt);
    })
    return values.join("/");
  }

  getEigenschaftsWert(name: string) {
    return this.held.eigenschaften[name].akt;
  }

  removeFavorite(data) {

    const idx = this.data.findIndex(d => d.name === data);
    this.data.splice(idx, 1);
    this.favoriteRemoved(data);
  }

  private similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    const longerLength = longer.length;
    if (longerLength === 0) {
      return 1.0;
    }
    return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  private editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0)
          costs[j] = j;
        else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

}
