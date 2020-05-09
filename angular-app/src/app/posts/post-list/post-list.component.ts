import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  router: any;
  constructor(public postsService: PostsService) {}
  private postSubscription: Subscription;
  private mode = 'create';
  private postId: string;
  isLoading = false;
  postsSub: any;
  @Input() posts: Post[] = [];
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  onDelete(postId: string) {
    this.postsService.deletPost(postId);
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
