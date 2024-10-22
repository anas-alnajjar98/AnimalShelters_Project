import { Component } from '@angular/core';
import { UrlService } from '../UrlService/url.service';
import { Observable } from 'rxjs';

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

  posts: any[] = [];
  getAllPosts() {
    
    this._ser.allPosts().subscribe((data) => {
      this.posts = data;

           })
     
  };

  data = {
    "postId": 0,
    "userId": localStorage.getItem("userId")
}

  addLike(postId: number) {
    this.data.postId = postId
    this._ser.addLike(this.data).subscribe(() => {
      
     
      this.getAllPosts();

    })
  }


  }






  

