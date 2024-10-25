import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allcategories',
  templateUrl: './allcategories.component.html',
  styleUrl: './allcategories.component.css'
})
export class AllcategoriesComponent {
  ngOnInit() {

    this.GetCategoryAdmin();
  }
  constructor(private _ser: UrlServiceService, private router: Router) {


  }

  Array: any
  GetCategoryAdmin() {
    this._ser.getCategory().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.categoryArray")
    })

  }

  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteCategory(id).subscribe(
          () => {
            console.log('Category deleted');
            this.Array = this.Array.filter((item: any) => item.id !== id);

            Swal.fire(
              'Deleted!',
              'The category has been deleted.',
              'success'
            );
          },
          (error) => {
            console.error('Error deleting category:', error);

            // Show error message only if there's a confirmed issue
            Swal.fire(
              'Error!',
              'There was a problem deleting the category. Please try again later.',
              'error'
            );
          }
        );
      }
    });
  }
}
