import { Component } from '@angular/core';
import { UrlService } from '../UrlService/url.service';

@Component({
  selector: 'app-our-community',
  templateUrl: './our-community.component.html',
  styleUrl: './our-community.component.css'
})
export class OurCommunityComponent {


  ngOnInit() {
    this.getAllPosts();
  }

  constructor(private _ser: UrlService) { }

  posts: any;
  getAllPosts() {
    
    this._ser.allPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }



  
}
