import { Component } from '@angular/core';
import { UrlService } from '../UrlService/url.service';

@Component({
  selector: 'app-our-community',
  templateUrl: './our-community.component.html',
  styleUrl: './our-community.component.css'
})
export class OurCommunityComponent {

  userName: string = 'John Doe';
  postTitle: string = 'Exploring the Gravel Roads';
  postContent: string = 'This is a short bio/description for the post, describing the moment captured in the image.';

  likes: number = 245;
  comments: { user: string, text: string }[] = [
    { user: 'Ali Ahmad', text: 'Great shot!' },
    { user: 'Othman Ali', text: 'Nice picture!' }
  ];
  postImage: string = 'https://media.4-paws.org/9/c/9/7/9c97c38666efa11b79d94619cc1db56e8c43d430/Molly_006-2829x1886-2726x1886-1920x1328.jpg';
  postBio: string = 'This is a short bio/description for the post, describing the moment captured in the image.';
  showCommentBox: boolean = false;
  newComment: string = '';

  ngOnInit() {
    this.getAllPosts();
  }

  constructor(private _ser: UrlService) { }

  posts: any;
  getAllPosts() {
    debugger
    this._ser.allPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }


  likePost() {
    this.likes++;
  }

  toggleCommentBox() {
    this.showCommentBox = !this.showCommentBox;
  }

  submitComment() {
    if (this.newComment.trim()) {
      this.comments.push({ user: 'You', text: this.newComment });
      this.newComment = '';
      this.showCommentBox = false;
    }
  }
}
