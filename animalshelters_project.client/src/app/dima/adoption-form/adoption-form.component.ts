import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css'
})
export class AdoptionFormComponent {
  constructor(private _ser: UrlServiceService, private route: ActivatedRoute, private router: Router) { }
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
    debugger
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
    debugger
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
  FormSubmit(animalID: number, userID: any) {
    debugger
   
    if (userID === null || userID === undefined) {
      Swal.fire({
        icon: 'info',
        title: 'Login',
        text: `You need to login first`,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
      return;
    }

    this._ser.SubmitAdoptionApplication(animalID, userID).subscribe(response => {
      console.log("Application submitted successfully", response);

      Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        text: `Your adoption application has been submitted successfully.`,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/']);
        }
      });

    }, error => {
      console.error("Failed to submit application", error);

      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your application. Please try again later.',
        confirmButtonText: 'OK'
      });
    });
  }




}
