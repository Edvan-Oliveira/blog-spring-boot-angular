import {Component, OnInit} from '@angular/core';
import {IPostResponseDTO} from "../../post/models/IPostResponseDTO";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../post/services/post.service";
import {MessageService} from "primeng/api";
import {IAlbumResponseDTO} from "../models/IAlbumResponseDTO";
import {AlbumService} from "../services/album.service";
import {IPhotoResponseDTO} from "../models/IPhotoResponseDTO";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss'
})
export class AlbumDetailComponent  implements OnInit {

  albumResponseDTO!: IAlbumResponseDTO;
  photos: IPhotoResponseDTO[] = [];
  responsiveOptions: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.albumService.findById(params['id']).subscribe({
        next: response => {
          this.albumResponseDTO = response;
          this.photos = response.photos;
          console.log(this.albumResponseDTO);
        },
        error: err => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro'})
      });
    });
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }

}
