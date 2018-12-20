import {Userauthentication} from '../authentication/userauthentication';

export class AuthenticationLocaleStorageObject {


  private _value: Userauthentication;
  constructor(private key: string){
    const val = localStorage.getItem(key);
    if (val !== null) {
      this._value = JSON.parse(val);
    }
  }

  get value(): Userauthentication {
    return this._value;
  }

  set value(value: Userauthentication) {
    this._value = value;
    localStorage.setItem(this.key, JSON.stringify(value));
  }


}
