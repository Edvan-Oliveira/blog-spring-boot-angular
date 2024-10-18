import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {PostService} from "./services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  postForm: FormGroup

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    })
  }

  save() {
    if (this.postForm.valid) {
      this.postService.save(this.postForm.value).subscribe({
        next: r => {
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Publicação salva'});
          this.router.navigate(['']);
        },
        error: err => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro'})
      })
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Formulário inválido' });
    }
  }

}
