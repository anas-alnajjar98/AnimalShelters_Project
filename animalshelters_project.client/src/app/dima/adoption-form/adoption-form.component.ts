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
  UserId:any
  UserData: any;
  

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const AnimalID = params.get('id');
      if (AnimalID) {
        this.AnimalID = +AnimalID;
        this.GetAnimalDetails(this.AnimalID);
         this.UserId = localStorage.getItem('userId')
        this.GetUserInfo(this.UserId)
      }
    });
    //this.UserId = localStorage.getItem('userId')
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
  GetUserInfo(UserId: number): void {
    
    this._ser.GetUserByID(UserId).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.UserData = response;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
   
  }
  FormSubmit(animalID: number, userID: number) {
    console.log("Submitting application with AnimalID:", animalID, "and UserID:", userID);

    // Now, call your API to submit the adoption form
    this._ser.SubmitAdoptionApplication(animalID, userID).subscribe(response => {
      console.log("Application submitted successfully", response);
    //  // You can add logic here to handle success, like redirecting or showing a confirmation
    }, error => {
      console.error("Failed to submit application", error);
    });
  }

}
