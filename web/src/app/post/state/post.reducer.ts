import {IPostResponseDTO} from "../models/IPostResponseDTO";
import {createReducer, on} from "@ngrx/store";
import * as postActions from "./post.actions";
import {ICommentResponseDTO} from "../models/ICommentResponseDTO";

export interface IPostState {
  postList: IPostResponseDTO[] | null;
  post: IPostResponseDTO | null;
  savedSuccessfully: boolean;
  deletedSuccessfully: boolean;
}

const initialState: IPostState = {
  postList: null,
  post: null,
  savedSuccessfully: false,
  deletedSuccessfully: false
}

export const postReducer = createReducer<IPostState>(
  initialState,
  on(postActions.clearPostList, (state) => ({...state, postList: null})),
  on(postActions.loadPostListSuccess, (state, action) => ({...state, postList: action.postList})),
  on(postActions.clearPostById, (state) => ({...state, post: null})),
  on(postActions.loadPostByIdSuccess, (state, action) => ({...state, post: action.post})),
  on(postActions.clearSavePost, (state) => ({...state, savedSuccessfully: false})),
  on(postActions.savePostSuccess, (state, action) => ({...state, savedSuccessfully: action.savedSuccessfully})),
  on(postActions.clearDeletePostById, (state) => ({...state, deletedSuccessfully: false})),
  on(postActions.deletePostByIdSuccess, (state, action) => ({
    ...state,
    deletedSuccessfully: action.deletedSuccessfully
  })),
  on(postActions.clearSaveComment, (state) => ({...state, savedComment: null})),
  on(postActions.saveCommentSuccess, (state, action) => ({
    ...state,
    post: addCommentToPost(state.post, action.savedComment)
  })),
  on(postActions.deleteCommentByIdSuccess, (state, action) => ({
    ...state,
    post: updatePostComments(state.post, action.commentId)
  })),
);

function addCommentToPost(post: IPostResponseDTO | null, comment: ICommentResponseDTO): IPostResponseDTO | null {
  return post === null ? null :
    {
      ...post,
      comments: [...post.comments, comment]
    };
}

function updatePostComments(post: IPostResponseDTO | null, commentId: string): IPostResponseDTO | null {
  return post === null ? null :
    {
      ...post,
      comments: post.comments.filter(comment => comment.id !== commentId)
    };
}
