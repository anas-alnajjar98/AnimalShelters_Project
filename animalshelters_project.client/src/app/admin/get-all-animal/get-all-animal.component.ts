import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-animal',
  templateUrl: './get-all-animal.component.html',
  styleUrl: './get-all-animal.component.css'
})
export class GetAllAnimalComponent {

 
  ngOnInit() {

    this.GetAnimalAdmin();
  }
  constructor(private _ser: UrlServiceService, private router: Router) {


  }

  Array: any
  GetAnimalAdmin() {
    this._ser.GetAllAnimal().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.AnimalArray")
    })

  }



  //editAnimal(animalId: number) {
  //  console.log('Edit animal with ID:', animalId);
    
  //}
  deleteAnimal(animalId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this animal?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.DeleteAnimalByID(animalId).subscribe(
          () => {
            console.log('Animal deleted with ID:', animalId);
            // Remove the deleted animal from the Array
            this.Array = this.Array.filter((item: any) => item.animalId !== animalId);

            Swal.fire(
              'Deleted!',
              'The animal has been deleted successfully.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting animal:', error);
            Swal.fire(
              'Error!',
              'There was a problem deleting the animal. Please try again later.',
              'error'
            );
          }
        );
      }
    });
  }
}
