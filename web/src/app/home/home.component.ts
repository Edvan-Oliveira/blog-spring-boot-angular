import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {IPostResponseDTO} from "../post/models/IPostResponseDTO";
import {IAlbumResponseDTO} from "../album/models/IAlbumResponseDTO";
import {Store} from "@ngrx/store";
import * as postSelector from "../post/state/post.selector";
import {IAppState} from "../state/app.state";
import * as postActions from "../post/state/post.actions";
import * as albumActions from "../album/state/album.actions";
import * as albumSelector from "../album/state/album.selector";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  selectPostList$ = this.store.select(postSelector.selectPostList);
  selectAlbumList$ = this.store.select(albumSelector.selectAlbumList);

  postList: IPostResponseDTO[] = [];
  albumList: IAlbumResponseDTO[] = [];

  private subscriptions: Subscription[] = []

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.subscribeLoadPostList();
    this.subscribeLoadAlbumList();
    this.store.dispatch(postActions.loadPostList())
    this.store.dispatch(albumActions.loadAlbumList())
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(postActions.clearPostList())
    this.store.dispatch(albumActions.clearAlbumList())
  }

  private subscribeLoadPostList() {
    this.subscriptions.push(this.selectPostList$.subscribe(postList => {
      if (postList != null) {
        this.postList = postList;
      }
    }));
  }

  private subscribeLoadAlbumList() {
    this.subscriptions.push(this.selectAlbumList$.subscribe(albumList => {
      if (albumList != null) {
        this.albumList = albumList;
      }
    }));
  }

}
