import {RestService} from "../../shared/service/rest/rest.service";
import {Injectable} from "@angular/core";


@Injectable()
export class HeldMobilService {

  constructor(private restService: RestService) {}


  public getMobilInformation(heldid) {
    return this.restService.get(`held/mobil/${heldid}`);
  }

}
