import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>('http://localhost:3000/api/posts/' + id);
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;

    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/posts' + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((tansformedPosts) => {
        this.posts = tansformedPosts.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: tansformedPosts.maxPosts,
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(titleVal: string, contentVal: string, image: File) {
    const postData = new FormData();
    postData.append('title', titleVal);
    postData.append('content', contentVal);
    postData.append('image', image, titleVal);
    this.http
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }

  updatePost(
    idVal: string,
    titleVal: string,
    contentVal: string,
    image: File | string
  ) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', idVal);
      postData.append('title', titleVal);
      postData.append('content', contentVal);
      postData.append('image', image, titleVal);
    } else {
      postData = {
        id: idVal,
        title: titleVal,
        content: contentVal,
        imagePath: image,
        creator: null,
      };
    }
    this.http
      .put('http://localhost:3000/api/posts/' + idVal, postData)
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex((p) => p.id === idVal);
        const post: Post = {
          id: idVal,
          title: titleVal,
          content: contentVal,
          imagePath: '',
          creator: null,
        };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.router.navigate(['/']);
      });
  }
}
