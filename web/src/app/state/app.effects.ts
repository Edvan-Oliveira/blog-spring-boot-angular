import {PostEffects} from "../post/state/post.effects";
import {AlbumEffects} from "../album/state/album.effects";
import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as appActions from "./app.actions";
import {tap} from "rxjs";
import {MessageService} from "primeng/api";

@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private messageService: MessageService) {
  }

  appShowSuccessMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.appShowSuccessMessage),
      tap(action =>
        this.messageService.add({
          severity: 'success',
          summary: 'Mensagem do Sistema',
          detail: 'Operaçao realizada com sucesso!'
        })
      )
    ), {dispatch: false}
  );

  appShowErrorMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.appShowErrorMessage),
      tap(action => {
          console.error(action?.error)
          this.messageService.add({severity: 'error', summary: 'Mensagem do Sistema', detail: 'Ocorreu um erro!'})
        }
      )
    ), {dispatch: false}
  );

}

export const appEffects = [AppEffects, PostEffects, AlbumEffects]
