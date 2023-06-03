

import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export function HttpLoaderFactoryCustom(http: HttpClient) {
  return new TranslateHttpLoaderCustom(http);
}

class TranslateHttpLoaderCustom extends TranslateHttpLoader {
  constructor(http: HttpClient) {
    super(http);
  }

  getTranslation(lang: string): Observable<Object> {
    console.log('getTranslation', lang);

    let result = super.getTranslation(lang).pipe(
      tap((ele) => { console.log('getTranslation', ele); })
    )

    return result;
  }
}
