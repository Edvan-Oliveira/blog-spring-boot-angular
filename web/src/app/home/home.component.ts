import {Component, OnInit} from '@angular/core';
import {PostService} from "../post/services/post.service";
import {Observable, of} from "rxjs";
import {IPostResponseDTO} from "../post/models/IPostResponseDTO";
import {IAlbumResponseDTO} from "../album/models/IAlbumResponseDTO";
import {AlbumService} from "../album/services/album.service";
import {LocalStorageUtils} from "../util/local-storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  posts$: Observable<IPostResponseDTO[]> = of();
  albums$: Observable<IAlbumResponseDTO[]> = of();
  userToken: string | null = null;

  constructor(private postService: PostService,
              private albumService: AlbumService) {
  }

  ngOnInit() {
    this.userToken = LocalStorageUtils.getUserToken();
    this.posts$ = this.postService.findAll()
    this.albums$ = this.albumService.findAll()
  }
}
