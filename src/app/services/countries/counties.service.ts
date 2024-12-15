import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country, ICountry } from './countries';
import { CONFIG } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class CountiesService {
  private url = CONFIG.apiUrls.countries;

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<any>(this.url, { headers: { Accept: 'application/json' } }).pipe(
      map((response) => {
        try {
          const parsedResponse = JSON.parse(response);
          return (
            parsedResponse?.map((country: Country) => ({
              id: country?.Id,
              countryName: country?.CountryName,
              phoneCode: country?.PhoneCode
            })) || []
          );
        } catch (error) {
          console.error('Failed to parse response:', error);
          return [];
        }
      })
    );
  }
}

