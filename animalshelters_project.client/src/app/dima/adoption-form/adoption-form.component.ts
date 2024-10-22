import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css'
})
export class AdoptionFormComponent {
  constructor(private _ser: UrlServiceService, private route: ActivatedRoute) { }
  AnimalID: any;
  AnimalDetails: any;

  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const AnimalID = params.get('id');
      if (AnimalID) {
        this.AnimalID = +AnimalID;
        this.GetAnimalDetails(this.AnimalID);
      }
    });
  }
  GetAnimalDetails(AnimalID: number): void {
    this._ser.GetAnimalDetailsByID(AnimalID).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.AnimalDetails = response;
      },
      (error) => {
        console.error('Error fetching animal details:', error);
      }
    );
  }
}
