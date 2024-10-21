import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  

  constructor(private http: HttpClient) { }

  staticUrl = "https://localhost:7208/api";


  addPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticUrl}/Gharibeh_s/addPost`, data)
  }
}
