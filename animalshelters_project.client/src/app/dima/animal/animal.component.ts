import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'] 
})
export class AnimalComponent implements OnInit {
  animals: any[] = [];
  categoryId!: number;

  constructor(private _ser: UrlServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id'); 
      if (categoryId) {
        this.categoryId = +categoryId; 
        this.getAnimalsByCategory(this.categoryId); 
      }
    });
  }

  getAnimalsByCategory(categoryId: number): void {
    this._ser.GetAnimalsByCategory(categoryId).subscribe(
      (response) => {
        console.log('API Response:', response);  
        this.animals = response; 
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }

}
