import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import * as postActions from "./state/post.actions";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import * as postSelector from "./state/post.selector";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit, OnDestroy {

  selectSavePost$ = this.store.select(postSelector.selectSavePost);

  postForm: FormGroup;

  private subscriptions: Subscription[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private store: Store<IAppState>) {

    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    })

  }

  ngOnInit() {
    this.subscribeSavePost();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(postActions.clearSavePost())
  }

  private subscribeSavePost() {
    this.subscriptions.push(this.selectSavePost$.subscribe(response => {
      if (response) {
        this.router.navigate(['']);
      }
    }));
  }

  save() {
    if (this.postForm.valid) {
      this.store.dispatch(postActions.savePost({post: this.postForm.value}));
    } else {
      this.messageService.add({severity: 'warn', summary: 'Aviso', detail: 'Formulário inválido'});
    }
  }

}
