import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GoogleCloudVisionServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleCloudVisionServiceProvider {

  constructor(public http: Http) {
  }

  getLabels(base64Image) {
    const body = {
      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "LABEL_DETECTION"
            }
          ],
          "imageContext": {
            "languageHints": [
              "es"
            ]
          }
        }
      ]
    }
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD57UECkdh8chnYgIGkKGnmfsAL_qCvPM0', body);
    }
}