import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPostResponseDTO} from "../models/IPostResponseDTO";
import {MessageService} from "primeng/api";
import {LocalStorageUtils} from "../../util/local-storage";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICommentRequestDTO} from "../models/ICommentRequestDTO";
import * as postSelector from "../state/post.selector";
import {Store} from "@ngrx/store";
import {IAppState} from "../../state/app.state";
import * as postActions from "../state/post.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit, OnDestroy {

  selectPostById$ = this.store.select(postSelector.selectPostById);
  selectDeletePost$ = this.store.select(postSelector.selectDeletePost);

  postResponseDTO!: IPostResponseDTO;
  postHtml: string = '';
  userToken: string | null = null;
  userId: string | null = null;
  commentForm: FormGroup;

  private subscriptions: Subscription[] = []

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private store: Store<IAppState>) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.subscribeLoadPostById();
    this.subscribeDeletePost();
    this.userId = LocalStorageUtils.getUserId();
    this.userToken = LocalStorageUtils.getUserToken();
    this.route.params.subscribe(params => this.store.dispatch(postActions.loadPostById({postId: params['id']})));
  }

  ngOnDestroy() {
    this.store.dispatch(postActions.clearPostById());
    this.store.dispatch(postActions.clearDeletePostById());
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private subscribeLoadPostById() {
    this.subscriptions.push(this.selectPostById$.subscribe(post => {
      if (post != null) {
        this.postResponseDTO = post;
        this.postHtml = post.content;
      }
    }));
  }

  private subscribeDeletePost() {
    this.subscriptions.push(this.selectDeletePost$.subscribe(response => {
      if (response) {
        this.router.navigate(['']);
      }
    }));
  }

  deletePost() {
    this.store.dispatch(postActions.deletePostById({postId: this.postResponseDTO.id}))
  }

  comment() {
    if (this.commentForm.valid) {
      const comment: ICommentRequestDTO = {
        content: this.commentForm.controls['content'].value,
        post: {id: this.postResponseDTO.id}
      }
      this.commentForm.reset();
      this.store.dispatch(postActions.saveComment({comment}));
    } else {
      this.messageService.add({severity: 'warn', summary: 'Aviso', detail: 'Formulário inválido'});
    }
  }

  deleteComment(commentId: string) {
    this.store.dispatch(postActions.deleteCommentById({commentId}));
  }
}
