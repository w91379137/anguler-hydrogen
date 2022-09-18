import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolStringService {

  constructor() { }

  removeTrailingSlash(str) {
    return str.replace(/\/+$/, '');
  }
}
