import {UserAuthentication} from '../authentication/UserAuthentication';

export class AuthenticationLocaleStorageObject {


  private _value: UserAuthentication;
  constructor(private key: string){
    const val = localStorage.getItem(key);
    if (val !== null) {
      this._value = JSON.parse(val);
    }
  }

  get value(): UserAuthentication {
    return this._value;
  }

  set value(value: UserAuthentication) {
    this._value = value;
    localStorage.setItem(this.key, JSON.stringify(value));
  }


}
