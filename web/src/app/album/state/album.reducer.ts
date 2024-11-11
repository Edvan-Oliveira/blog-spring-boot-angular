import {createReducer, on} from "@ngrx/store";
import * as albumActions from "./album.actions";
import {IAlbumResponseDTO} from "../models/IAlbumResponseDTO";

export interface IAlbumState {
  albumList: IAlbumResponseDTO[] | null;
  album: IAlbumResponseDTO | null;
  savedSuccessfully: boolean;
  deletedSuccessfully: boolean;
}

const initialState: IAlbumState = {
  albumList: null,
  album: null,
  savedSuccessfully: false,
  deletedSuccessfully: false
}

export const albumReducer = createReducer<IAlbumState>(
  initialState,
  on(albumActions.clearAlbumList, (state) => ({...state, albumList: null})),
  on(albumActions.loadAlbumListSuccess, (state, action) => ({...state, albumList: action.albumList})),
  on(albumActions.clearAlbumById, (state) => ({...state, album: null})),
  on(albumActions.loadAlbumByIdSuccess, (state, action) => ({...state, album: action.album})),
  on(albumActions.clearSaveAlbum, (state) => ({...state, savedSuccessfully: false})),
  on(albumActions.saveAlbumSuccess, (state, action) => ({...state, savedSuccessfully: action.savedSuccessfully})),
  on(albumActions.clearDeleteAlbumById, (state) => ({...state, deletedSuccessfully: false})),
  on(albumActions.deleteAlbumByIdSuccess, (state, action) => ({...state, deletedSuccessfully: action.deletedSuccessfully}))
);
