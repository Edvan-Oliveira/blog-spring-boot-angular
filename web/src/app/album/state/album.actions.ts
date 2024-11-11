import {createAction, props} from "@ngrx/store";
import {IAlbumResponseDTO} from "../models/IAlbumResponseDTO";

export const clearAlbumList = createAction('[Album] clear album list');
export const loadAlbumList = createAction('[Album] fetch album list');
export const loadAlbumListSuccess = createAction('[Album] load album list', props<{ albumList: IAlbumResponseDTO[] }>());

export const clearSaveAlbum = createAction('[Album] clear save album');
export const saveAlbum = createAction('[Album] save album', props<{ album: FormData }>());
export const saveAlbumSuccess = createAction('[Album] save album success', props<{ savedSuccessfully: boolean }>());

export const clearAlbumById = createAction('[Album] clear album by id');
export const loadAlbumById = createAction('[Album] load album by id', props<{ albumId: string }>());
export const loadAlbumByIdSuccess = createAction('[Album] load album by id success', props<{ album: IAlbumResponseDTO }>());

export const clearDeleteAlbumById = createAction('[Album] clear delete album by id');
export const deleteAlbumById = createAction('[Album] delete album by id', props<{ albumId: string }>());
export const deleteAlbumByIdSuccess = createAction('[Album] delete album by id success', props<{ deletedSuccessfully: boolean }>());
