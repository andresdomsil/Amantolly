import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GoogleCloudTranslateServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleCloudTranslateServiceProvider {

  constructor(public http: Http) {
  }

  traducir(palabra){
    const body={
      'q': palabra,
      'source': 'en',
      'target': 'es',
      'format': 'text'
    }
    return this.http.post('https://translation.googleapis.com/language/translate/v2?key=AIzaSyD57UECkdh8chnYgIGkKGnmfsAL_qCvPM0', body);
  }

}
