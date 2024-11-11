import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {catchError, map, mergeMap, of} from "rxjs";
import * as albumActions from "./album.actions";
import {AlbumService} from "../services/album.service";
import * as appActions from "../../state/app.actions";

@Injectable()
export class AlbumEffects {

  loadAlbumList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(albumActions.loadAlbumList),
      mergeMap(() =>
        this.albumService.findAll().pipe(
          map(albumList => albumActions.loadAlbumListSuccess({albumList}))
        )
      )
    )
  );

  saveAlbum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(albumActions.saveAlbum),
      mergeMap((action) =>
        this.albumService.save(action.album).pipe(
          mergeMap(() => [
            albumActions.saveAlbumSuccess({savedSuccessfully: true}),
            appActions.appShowSuccessMessage()
          ]),
          catchError((error) => of(appActions.appShowErrorMessage({error})))
        )
      )
    )
  );

  loadAlbumById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(albumActions.loadAlbumById),
      mergeMap((action) =>
        this.albumService.findById(action.albumId).pipe(
          map(album => albumActions.loadAlbumByIdSuccess({album})),
          catchError((error) => of(appActions.appShowErrorMessage({error})))
        )
      )
    )
  );

  deleteAlbumById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(albumActions.deleteAlbumById),
      mergeMap(action =>
        this.albumService.deleteById(action.albumId).pipe(
          mergeMap(() => [
            albumActions.deleteAlbumByIdSuccess({deletedSuccessfully: true}),
            appActions.appShowSuccessMessage()
          ]),
          catchError((error) => of(appActions.appShowErrorMessage({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private albumService: AlbumService) {
  }
}
