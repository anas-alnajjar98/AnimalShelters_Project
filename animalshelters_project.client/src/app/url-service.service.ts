import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {

  constructor(private http: HttpClient) { }
  staticData = "https://localhost:7208/api";

  
  getCategory(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetAllCategory`);
  
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.staticData}/Admin/DeletCategoryById/${id}`);
  }

  GetAnimalsByCategory(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.staticData}/Admin/AnimalsbyCategoryId/${id}`);
  }
  GetAnimalDetailsByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetAnimalDetailsById/${id}`)
  }

  GetUserByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/getUserByID/${id}`)
  }
}
