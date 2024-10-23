import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  ngOnInit() { }
  constructor(private _ser: UrlServiceService, private _router: Router) {
  }


  image: any

  changeImage(event: any) {

    this.image = event.target.files[0]
  }
  addCategory(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])

    }
    form.append("Image", this.image)
    this._ser.AddCategory(form).subscribe(() => {
      alert("The category has been added successfully");


      this._router.navigate(['AdminDashBoard/AllCategories']);
    }, error => {

      console.error("Error updating category", error);
    });
  }
}
