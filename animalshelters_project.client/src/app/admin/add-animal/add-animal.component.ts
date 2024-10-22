import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrl: './add-animal.component.css'
})
export class AddAnimalComponent {

  shelters: any[] = [];
  categories: any[] = [];
  image: any

  ngOnInit() {
    this._ser.getShelters().subscribe(
      (sheltersResponse) => {
        this.shelters = sheltersResponse; 
      },
      (error) => {
        console.error('Error fetching shelters', error);
      }
    );
    this._ser.getCategory().subscribe(
      (categoriesResponse) => {
        this.categories = categoriesResponse; 
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
}
  constructor(private _ser: UrlServiceService, private _router: Router) {
  }
 
  changeImage(event: any) {

    this.image = event.target.files[0]
  }
  addAnimal(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])

    }
    form.append("ImageUrl", this.image)
    this._ser.AddAnimal(form).subscribe(() => {
      alert("The Animal has been added successfully");


      this._router.navigate(['AdminDashBoard/AllAnimal']);
    }, error => {

      console.error("Error updating Animal", error);
    });
  }
}
