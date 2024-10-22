import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service'; // استيراد خدمة API
import { Router } from '@angular/router'; // لإعادة التوجيه بين الصفحات

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: number;
  userProfile: any;
  userOrders: any[] = [];

  constructor(private apiService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = +storedUserId;
      this.loadUserProfile();
      this.loadUserApps();
    } else {
      console.error('User ID not found in localStorage!');
      this.router.navigate(['/login']);
    }
  }

  loadUserProfile(): void {
    this.apiService.getUserProfile(this.userId).subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  loadUserApps(): void {
    this.apiService.getUserApps(this.userId).subscribe(
      (data: any) => {
        this.userOrders = Array.isArray(data) ? data : [];
      },
      (error) => {
        console.error('Error fetching user Applications:', error);
      }
    );
  }

  isActive(endDate: string): boolean {
    const today = new Date();
    return new Date(endDate) >= today;
  }

}
