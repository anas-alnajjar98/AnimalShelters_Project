import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
  styleUrl: './update-animal.component.css'
})
export class UpdateAnimalComponent {
  param: any
  imageFile: File | null = null;
  animal: any = {};
  categories: any[] = [];
  shelters: any[] = [];

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id')

    this._ser.getAnimalById(this.param).subscribe(response => {
      debugger
      this.animal = response;
    }


      , error => {
      console.error("Error fetching animal data", error);
    });
   
    this._ser.getShelters().subscribe(sheltersResponse => {
      this.shelters = sheltersResponse; 
    }, error => {
      console.error("Error fetching shelters", error);
    });

    this._ser.getCategory().subscribe(categoriesResponse => {
      this.categories = categoriesResponse; // Store categories for dropdown
    }, error => {
      console.error("Error fetching categories", error);
    });
  }
  constructor(private _ser: UrlServiceService, private _active: ActivatedRoute, private _router: Router) {


  }
  changeImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      console.log('Selected image:', this.imageFile);
    }
  }
  Array: any
  Updateanimal(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])

    }

    if (this.imageFile) {
      form.append('ImageUrl', this.imageFile);
    }
    
    form.forEach((value, key) => {
      console.log(key, value);
    });

    this._ser.UpdateAnimal(this.param, form).subscribe(response => {
      alert("The Animal has been updated successfully");


      this._router.navigate(['AdminDashBoard/AllAnimal']);
    }, error => {

      console.error("Error updating Animals", error);
    });
  }

}
