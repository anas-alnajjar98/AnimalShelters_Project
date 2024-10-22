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

      this.posts.forEach(post => {
        this.getLikesPerPost(post.id).subscribe(likesData => {
          post.likes = likesData;
        })
      })
      this.getLikesPerPost(data.id)
      console.log(this.posts);
    });
  }


  likes: any


  getLikesPerPost(id: any): Observable<any> {
    return this._ser.getLikesPerPost(id);
  }


  
}
