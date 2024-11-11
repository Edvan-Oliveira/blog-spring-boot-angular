import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "./app.state";
import {postReducer} from "../post/state/post.reducer";
import {albumReducer} from "../album/state/album.reducer";

export const appReducer: ActionReducerMap<IAppState> = {
  postState: postReducer,
  albumState: albumReducer
}
