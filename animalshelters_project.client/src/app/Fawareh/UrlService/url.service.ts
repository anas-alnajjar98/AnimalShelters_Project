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

  allPosts(): Observable<any> {

    return this.http.get<any>(`${this.staticUrl}/Gharibeh_s/allPost`)
  }

  getLikesPerPost(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/Gharibeh_s/countLikes/${id}`)
  }
}
