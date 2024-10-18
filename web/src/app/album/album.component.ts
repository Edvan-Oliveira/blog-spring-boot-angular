import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../post/services/post.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AlbumService} from "./services/album.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent {

  uploadedFiles: any[] = [];
  albumForm: FormGroup

  constructor(
    private albumService: AlbumService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService) {
    this.albumForm = this.fb.group({
      title: ['', [Validators.required]]
    })
  }

  onUpload(event:any) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  save() {
    if (this.albumForm.valid && this.uploadedFiles.length > 0) {

      const formData = new FormData();
      formData.append('title', this.albumForm.controls['title'].value);
      this.uploadedFiles.forEach(file => {
        formData.append('photos', file);
      })

      this.albumService.save(formData).subscribe({
        next: r => {
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Álbum de fotos salvo'});
          this.router.navigate(['']);
        },
        error: err => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro'})
      })
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Formulário inválido' });
    }
  }

}


