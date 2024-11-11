import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IPostState} from "./post.reducer";

const selectPostFeature = createFeatureSelector<IPostState>('postState')

export const selectPostList = createSelector(selectPostFeature, (state: IPostState) => state.postList);
export const selectPostById = createSelector(selectPostFeature, (state: IPostState) => state.post);
export const selectSavePost = createSelector(selectPostFeature, (state: IPostState) => state.savedSuccessfully);
export const selectDeletePost = createSelector(selectPostFeature, (state: IPostState) => state.deletedSuccessfully);
