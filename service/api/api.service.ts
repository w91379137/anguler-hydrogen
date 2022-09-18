import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { ApiResponse } from './api.schema';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  constructor(
    private http: HttpClient,
  ) { }

  // ====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====.====

  async convenientPost(
    path: string,
    body: any = {},
    headers: any = {},
    waitTime: number = 1500,
  ): Promise<ApiResponse> {
    // debug(`api path: %o body: %o`, path, body);
    // console.log('api', path);

    const data = await this.http.post(path, body, { headers }).pipe(timeout(waitTime))
      .toPromise()
      .catch(this.handleError);

    let res = new ApiResponse()
    res.body = data
    return res;
  }

  private handleError(error: any): Promise<ApiResponse> {
    console.log('Api error', error);

    let res = new ApiResponse()
    res.isError = true
    res.error = error

    return Promise.resolve(res);
  }
}
