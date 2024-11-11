import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import * as albumSelector from "./state/album.selector";
import * as albumActions from "./state/album.actions";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit, OnDestroy {

  selectSaveAlbum$ = this.store.select(albumSelector.selectSaveAlbum);

  uploadedFiles: any[] = [];
  albumForm: FormGroup;

  private subscriptions: Subscription[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private store: Store<IAppState>) {
    this.albumForm = this.fb.group({
      title: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.subscribeSaveAlbum();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(albumActions.clearSaveAlbum())
  }

  private subscribeSaveAlbum() {
    this.subscriptions.push(this.selectSaveAlbum$.subscribe(response => {
      if (response) {
        this.router.navigate(['']);
      }
    }));
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  save() {
    if (this.albumForm.valid && this.uploadedFiles.length > 0) {
      const formData = new FormData();
      formData.append('title', this.albumForm.controls['title'].value);

      this.uploadedFiles.forEach(file => {
        formData.append('photos', file);
      });

      this.store.dispatch(albumActions.saveAlbum({album: formData}));
    } else {
      this.messageService.add({severity: 'warn', summary: 'Aviso', detail: 'Formulário inválido'});
    }
  }

}


