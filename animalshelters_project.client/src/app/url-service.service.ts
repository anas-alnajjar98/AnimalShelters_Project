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
  GetAnimalsByCategory(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.staticData}/Admin/AnimalsbyCategoryId/${id}`);
  }
  GetAnimalDetailsByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetAnimalDetailsById/${id}`)
  }

  submitContactForm(contactData: FormData): Observable<any> {
    return this.http.post(`${this.staticData}/Contact/newmassege`, contactData );
  }



}
