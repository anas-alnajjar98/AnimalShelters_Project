import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
  param: any
  imageFile: File | null = null;
  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id')
   
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
  UpdateCategory(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])

    }
    if (this.imageFile) {
      form.append('Image', this.imageFile); 
    } else {
      console.error('No image file selected');
    }

    this._ser.updateCategory(this.param, form).subscribe(response => {
      alert("The category has been updated successfully");


      this._router.navigate(['AdminDashBoard/AllCategories']);
    }, error => {

      console.error("Error updating category", error);
    });
  }

}
