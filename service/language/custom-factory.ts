

import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable, merge } from "rxjs";

export function HttpLoaderFactoryCustom(http: HttpClient, prefix = [''], suffix = "json") {
  return new TranslateCustomHttpLoader(http, prefix, suffix);
}

class TranslateCustomHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private prefix = [''],
    private suffix = "json"
  ) { }

  getObservableForHttp(subPath, combinedObject, lang: string): Observable<Object> {

    let path = `./assets/i18n/${lang}.${this.suffix}`
    if (subPath) {
      path = `./assets/i18n/${lang}.${subPath}.${this.suffix}`
    }

    let result = new Observable(observer => {

        this.http.get(path).subscribe((res) => {
          // console.log('getObservableForHttp', res);
          let responseObj = res;
          Object.keys(responseObj).forEach(key=>{
              combinedObject[key] = responseObj[key];
          });
          // console.log(combinedObject);
          observer.next(combinedObject);
          // call complete if you want to close this stream (like a promise)
          observer.complete();
        });
    });
    return result;
  }

  getTranslation(lang: string): Observable<Object> {
    // console.log('getTranslation', lang);

    var combinedObject = new Object();
    let allfile = this.prefix.map((value) => this.getObservableForHttp(value, combinedObject, lang));

    return merge(...allfile)
  }
}

