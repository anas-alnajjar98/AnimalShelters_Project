import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit {
  contacts: any[] = [];

  constructor(private _ser: UrlServiceService, private _router: Router) { }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this._ser.ContactAdmin().subscribe(
      (data) => {
        this.contacts = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }
}



