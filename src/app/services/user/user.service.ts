import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { CONFIG } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = CONFIG.apiUrls.registerUser;

  constructor(private httpClient: HttpClient) {}

  createNewUser(params: any): Observable<any> {
    const phoneNum = params.phone.match(/[1-9][0-9]*/g).join('');
    console.log(phoneNum);
    
    const phonePrefix = params.prefix.includes('+')
      ? params.prefix.slice(1)
      : params.prefix;

    const user = {
      name: params.name,
      email: params.email,
      country: params.country,
      phone: phonePrefix + phoneNum,
    };
    const userParams = new HttpParams()
      .set('EMAIL', user.email)
      .set('phone', user.phone)
      .set('firstname', user.name)
      .set('country', user.country);

    return this.httpClient.get<any>(this.url, { params: userParams });
  }
}
