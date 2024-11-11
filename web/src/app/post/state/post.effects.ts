import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {PostService} from "../services/post.service";
import {catchError, map, mergeMap, of} from "rxjs";
import * as postActions from "./post.actions";
import * as appActions from "../../state/app.actions";
import {CommentService} from "../services/comment.service";

@Injectable()
export class PostEffects {

  loadPostList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.loadPostList),
      mergeMap(() =>
        this.postService.findAll().pipe(
          map(postList => postActions.loadPostListSuccess({postList})),
          catchError((error) => of(appActions.appShowErrorMessage(error))
          )
        )
      )
    )
  );

  savePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.savePost),
      mergeMap((action) =>
        this.postService.save(action.post).pipe(
          mergeMap(() => [
            postActions.savePostSuccess({savedSuccessfully: true}),
            appActions.appShowSuccessMessage()
          ]),
          catchError((error) => of(appActions.appShowErrorMessage({error})))
        )
      )
    )
  );

  loadPostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.loadPostById),
      mergeMap((action) =>
        this.postService.findById(action.postId).pipe(
          map(post => postActions.loadPostByIdSuccess({post})),
          catchError((error) => of(appActions.appShowErrorMessage({error})))
        )
      )
    )
  );

  deletePostById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.deletePostById),
      mergeMap(action =>
        this.postService.deleteById(action.postId).pipe(
          mergeMap(() => [
            postActions.deletePostByIdSuccess({deletedSuccessfully: true}),
            appActions.appShowSuccessMessage()
          ]),
          catchError((error) => of(appActions.appShowErrorMessage({error})))
        )
      )
    )
  );

  saveComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.saveComment),
      mergeMap((action) =>
        this.commentService.save(action.comment).pipe(
          mergeMap((savedComment) => [
            postActions.saveCommentSuccess({savedComment}),
            appActions.appShowSuccessMessage()
          ]),
          catchError((error) => of(appActions.appShowErrorMessage({error})))
        )
      )
    )
  );

  deleteCommentById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postActions.deleteCommentById),
      mergeMap(action =>
        this.commentService.deleteById(action.commentId).pipe(
          mergeMap(() => [
            postActions.deleteCommentByIdSuccess({commentId: action.commentId}),
            appActions.appShowSuccessMessage()
          ]),
          catchError((error) => of(appActions.appShowErrorMessage({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private postService: PostService, private commentService: CommentService) {
  }
}

