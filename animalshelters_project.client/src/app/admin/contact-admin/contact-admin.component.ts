// contact-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css'] // Corrected property name
})
export class ContactAdminComponent implements OnInit {
  contacts: any[] = []; // Define the contacts array

  constructor(private _ser: UrlServiceService, private _router: Router) { }

  ngOnInit() {
    this.loadContacts(); // Use a descriptive method name
  }

  loadContacts() {
    this._ser.ContactAdmin().subscribe(
      (data: any[]) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  replyToContact(contactId: number): void {
    console.log('Replying to contact with ID:', contactId);
    // Implement actual reply logic here if necessary
  }
}

  //updateStatus(id: number) {
  //  this._ser.updateContactStatus(id).subscribe(

  //    () => {
  //      debugger

  //      alert('Contact status updated successfully!');
  //      this.getContacts();
  //    },
  //    (error) => {
  //      debugger

  //      alert('Error updating contact status');
  //      console.error('Error updating contact status:', error);
  //    }
  //  )


