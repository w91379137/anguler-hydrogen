

import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable, merge } from "rxjs";
import { map } from "rxjs/operators";

// https://github.com/ngx-translate/core/issues/199

export function HttpLoaderFactoryCustom(http: HttpClient, subPathList = [''], suffix = "json") {
  return new TranslateCustomHttpLoader(http, subPathList, suffix);
}

const DirPath = './assets/i18n';
class TranslateCustomHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private subPathList = [''],
    private suffix = "json"
  ) { }

  getObservableForHttp(lang: string, subPath: string, combinedObject: Object): Observable<Object> {

    let args = [lang, subPath, this.suffix].filter((value) => !!value)
    let path = `${DirPath}/${args.join('.')}`
    let result = this.http.get(path).pipe(
      map((res) => {
        Object.keys(res).forEach(key=>{
          combinedObject[key] = res[key];
        });
        return combinedObject;
      })
    )
    return result;
  }

  getTranslation(lang: string): Observable<Object> {
    // console.log('getTranslation', lang);

    var combinedObject = new Object();
    let subPathObservableList = this.subPathList
    .map((subPath) => this.getObservableForHttp(lang, subPath, combinedObject));

    return merge(...subPathObservableList)
  }
}

