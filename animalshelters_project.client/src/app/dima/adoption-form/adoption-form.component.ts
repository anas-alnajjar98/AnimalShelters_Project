import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']  // Make sure the correct path to CSS
})
export class AdoptionFormComponent implements OnInit {
  myform: FormGroup;
  AnimalID: any;
  AnimalDetails: any;
  UserId: any;
  UserData: any;

  constructor(private _ser: UrlServiceService, private route: ActivatedRoute, private router: Router) {
    // Initialize form group with form controls
    this.myform = new FormGroup({
      animalId: new FormControl(''),
      userId: new FormControl(''),
      adoptionNotes: new FormControl('', Validators.required)  // Required field validation
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const AnimalID = params.get('id');
      if (AnimalID) {
        this.AnimalID = +AnimalID;
        this.GetAnimalDetails(this.AnimalID);
        this.UserId = localStorage.getItem('userId');
        this.GetUserInfo(this.UserId);

        // Update form with values once data is loaded
        this.myform.patchValue({
          animalId: this.AnimalID,
          userId: this.UserId
        });
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

  FormSubmit() {
    if (!this.UserId) {
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

    // Check if form is valid before submission
    if (this.myform.valid) {
      const formData = this.myform.value;  // Get all form data
      console.log('Form Data:', formData);

      this._ser.SubmitAdoptionApplication(formData).subscribe(
        (response) => {
          console.log('Application submitted successfully', response);
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
        },
        (error) => {
          console.error('Failed to submit application', error);
          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'There was an error submitting your application. Please try again later.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
