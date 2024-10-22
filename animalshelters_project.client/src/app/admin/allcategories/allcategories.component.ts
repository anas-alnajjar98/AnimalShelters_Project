import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';

@Component({
  selector: 'app-allcategories',
  templateUrl: './allcategories.component.html',
  styleUrl: './allcategories.component.css'
})
export class AllcategoriesComponent {
  ngOnInit() {

    this.GetCategoryAdmin();
  }
  constructor(private _ser: UrlServiceService) {


  }

  Array: any
  GetCategoryAdmin() {
    this._ser.getCategory().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.categoryArray")
    })

  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this._ser.deleteCategory(id).subscribe(
        response => {
          console.log('Category deleted:', response);

          this.Array = this.Array.filter((item: any) => item.id !== id);
        },
        error => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }
}
