import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IAlbumResponseDTO} from "../models/IAlbumResponseDTO";
import {IPhotoResponseDTO} from "../models/IPhotoResponseDTO";
import {LocalStorageUtils} from "../../util/local-storage";
import {Store} from "@ngrx/store";
import {IAppState} from "../../state/app.state";
import * as albumActions from "../state/album.actions";
import * as albumSelector from "../state/album.selector";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss'
})
export class AlbumDetailComponent implements OnInit, OnDestroy {

  selectAlbumById$ = this.store.select(albumSelector.selectAlbumById);
  selectDeleteAlbum$ = this.store.select(albumSelector.selectDeleteAlbum);

  albumResponseDTO!: IAlbumResponseDTO;
  photos: IPhotoResponseDTO[] = [];
  responsiveOptions: any[] | undefined;
  userId: string | null = null;

  private subscriptions: Subscription[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.subscribeLoadAlbumById();
    this.subscribeDeleteAlbum();
    this.userId = LocalStorageUtils.getUserId();
    this.route.params.subscribe(params => this.store.dispatch(albumActions.loadAlbumById({albumId: params['id']})));
    this.responsiveOptions = [
      {breakpoint: '1024px', numVisible: 5},
      {breakpoint: '768px', numVisible: 3},
      {breakpoint: '560px', numVisible: 1}
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(albumActions.clearAlbumById())
    this.store.dispatch(albumActions.clearDeleteAlbumById())
  }

  private subscribeLoadAlbumById() {
    this.subscriptions.push(this.selectAlbumById$.subscribe(album => {
      if (album != null) {
        this.albumResponseDTO = album;
        this.photos = album.photos;
      }
    }));
  }

  private subscribeDeleteAlbum() {
    this.subscriptions.push(this.selectDeleteAlbum$.subscribe(response => {
      if (response) {
        this.router.navigate(['']);
      }
    }));
  }

  deleteAlbum() {
    this.store.dispatch(albumActions.deleteAlbumById({albumId: this.albumResponseDTO.id}))
  }
}
