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

  // Add a comment to a post
  addComment(postId: number, userId: number, content: string): Observable<any> {
    const commentData = { postId, userId, content };
    return this.http.post(`${this.staticUrl}/Gharibeh_s/addComment`, commentData);
  }

  // Get all comments for a specific post
  getComments(postId: number): Observable<any> {
    return this.http.get(`${this.staticUrl}/Gharibeh_s/displayComments/${postId}`);
  }

  getLikesPerPost(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/Gharibeh_s/countLikes/${id}`)
  }


}
