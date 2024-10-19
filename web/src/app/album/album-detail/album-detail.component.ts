import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {IAlbumResponseDTO} from "../models/IAlbumResponseDTO";
import {AlbumService} from "../services/album.service";
import {IPhotoResponseDTO} from "../models/IPhotoResponseDTO";
import {LocalStorageUtils} from "../../util/local-storage";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.scss'
})
export class AlbumDetailComponent  implements OnInit {

  albumResponseDTO!: IAlbumResponseDTO;
  photos: IPhotoResponseDTO[] = [];
  responsiveOptions: any[] | undefined;
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userId = LocalStorageUtils.getUserId();
    this.route.params.subscribe(params => {
      this.albumService.findById(params['id']).subscribe({
        next: response => {
          this.albumResponseDTO = response;
          this.photos = response.photos;
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

  deleteAlbum() {
    this.albumService.deleteById(this.albumResponseDTO.id).subscribe({
      next: response => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Álbum excluído'});
        this.router.navigate(['']);
      },
      error: err => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro'})
    });
  }
}
