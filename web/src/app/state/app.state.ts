import {IPostState} from "../post/state/post.reducer";
import {IAlbumState} from "../album/state/album.reducer";

export interface IAppState {
  postState: IPostState;
  albumState: IAlbumState;
}

