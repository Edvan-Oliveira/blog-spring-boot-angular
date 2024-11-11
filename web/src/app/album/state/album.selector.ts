import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IAlbumState} from "./album.reducer";

const selectAlbumFeature = createFeatureSelector<IAlbumState>('albumState')

export const selectAlbumList = createSelector(selectAlbumFeature, (state: IAlbumState) => state.albumList);
export const selectAlbumById = createSelector(selectAlbumFeature, (state: IAlbumState) => state.album);
export const selectSaveAlbum = createSelector(selectAlbumFeature, (state: IAlbumState) => state.savedSuccessfully);
export const selectDeleteAlbum = createSelector(selectAlbumFeature, (state: IAlbumState) => state.deletedSuccessfully);
