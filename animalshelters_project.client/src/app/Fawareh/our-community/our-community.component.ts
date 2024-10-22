import { Component } from '@angular/core';
import { UrlService } from '../UrlService/url.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-our-community',
  templateUrl: './our-community.component.html',
  styleUrl: './our-community.component.css'
})
export class OurCommunityComponent {

  showCommentBox: boolean = false;
  userId: any;

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
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

      this.posts.forEach(post => {
        this.getComments(post.id).subscribe(commentsData => {
          post.comments = commentsData
        })
      })
      this.getLikesPerPost(data.id)
      console.log(this.posts);
    });

  }

  toggleCommentBox() {
    this.showCommentBox = !this.showCommentBox;
  }




  likes: any


  getLikesPerPost(id: any): Observable<any> {
    return this._ser.getLikesPerPost(id);
  }


  
}
