import {Md5} from 'ts-md5/dist/md5';
import {Injectable} from "@angular/core";
import {IAppToken} from './app-token.interface';
/**
 * @returns String unixTimestamp
 * @var Date timestamp
 */
@Injectable()

export class UnixTimeStamp {
  timestamp = new Date;
  unixTimeStamp: any;
  constructor() {
    this.unixTimeStamp = String(this.timestamp.getTime() / 1000 | 0);
  }
}

/**
 * @param UnixTimeStamp timeStamp
 * @returns String this.hashed
 */
@Injectable()

export class CreateHash {
  hashed: any;
  constructor(timeStamp: UnixTimeStamp, secret: string) {

    this.hashed = Md5.hashStr(timeStamp.unixTimeStamp + secret);
  }
}

/**
 * This function is an injectable function that takes the the user, the login property and the secret to create a custom token
 * @param myData String
 * @returns object
 */

@Injectable()
export class CreateTokenService implements IAppToken {
  hashed;
  loginP;

  constructor(myData: string) {
    let data = JSON.parse(myData);
    window.alert('mannaggia'+ JSON.stringify(data));
    return  {
      'hashed': '',
      'loginP': data.loginP
    };
  }

}
