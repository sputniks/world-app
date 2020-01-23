import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
 
    private baseUrl: string = 'http://localhost:80';
 
    constructor(private httpClient: HttpClient) { }
 
    getCities(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/getCities`);
    };
 
    sortData(sortOptions): Observable<any> {
        return this.httpClient.post(`${this.baseUrl}/sort`, sortOptions);
    };
}
