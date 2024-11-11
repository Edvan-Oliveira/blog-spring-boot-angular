import {createAction, props} from "@ngrx/store";
import {IPostResponseDTO} from "../models/IPostResponseDTO";
import {IPostRequestDTO} from "../models/IPostRequestDTO";
import {ICommentRequestDTO} from "../models/ICommentRequestDTO";
import {ICommentResponseDTO} from "../models/ICommentResponseDTO";

export const clearPostList = createAction('[Post] clear post list');
export const loadPostList = createAction('[Post] load post list');
export const loadPostListSuccess = createAction('[Post] load post list success', props<{
  postList: IPostResponseDTO[]
}>());

export const clearSavePost = createAction('[Post] clear save post');
export const savePost = createAction('[Post] save post', props<{ post: IPostRequestDTO }>());
export const savePostSuccess = createAction('[Post] save post success', props<{ savedSuccessfully: boolean }>());

export const clearPostById = createAction('[Post] clear post by id');
export const loadPostById = createAction('[Post] load post by id', props<{ postId: string }>());
export const loadPostByIdSuccess = createAction('[Post] load post by id success', props<{ post: IPostResponseDTO }>());

export const clearDeletePostById = createAction('[Post] clear delete post by id');
export const deletePostById = createAction('[Post] delete post by id', props<{ postId: string }>());
export const deletePostByIdSuccess = createAction('[Post] delete post by id success', props<{
  deletedSuccessfully: boolean
}>());

export const clearSaveComment = createAction('[Post Comment] clear save post comment');
export const saveComment = createAction('[Post Comment] save post comment', props<{ comment: ICommentRequestDTO }>());
export const saveCommentSuccess = createAction('[Post Comment] save post comment success', props<{
  savedComment: ICommentResponseDTO
}>());


export const deleteCommentById = createAction('[Post Comment] delete a post comment by id', props<{
  commentId: string
}>());

export const deleteCommentByIdSuccess = createAction('[Post Comment] delete a post comment by id success', props<{
  commentId: string
}>());
