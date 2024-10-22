import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-shelter',
  templateUrl: './add-shelter.component.html',
  styleUrl: './add-shelter.component.css'
})
export class AddShelterComponent {
  ngOnInit() { }
  constructor(private _ser: UrlServiceService, private _router: Router) {
  }



  addShelter(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])

    }

    this._ser.AddShelter(form).subscribe(() => {
      alert("The shelter has been added successfully");


      this._router.navigate(['AdminDashBoard/AllShelters']);
    }, error => {

      console.error("Error Adding Shelter", error);
    });
  }
}
