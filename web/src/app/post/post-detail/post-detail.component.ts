import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../services/post.service";
import {IPostResponseDTO} from "../models/IPostResponseDTO";
import {MessageService} from "primeng/api";
import {LocalStorageUtils} from "../../util/local-storage";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../services/comment.service";
import {ICommentRequestDTO} from "../models/ICommentRequestDTO";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {

  postResponseDTO!: IPostResponseDTO;
  postHtml = '';
  userToken: string | null = null;
  userId: string | null = null;
  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.userId = LocalStorageUtils.getUserId();
    this.userToken = LocalStorageUtils.getUserToken();

    this.route.params.subscribe(params => {
      this.postService.findById(params['id']).subscribe({
        next: response => {
          this.postResponseDTO = response;
          this.postHtml = response.content;
        },
        error: err => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro'})
      });
    });
  }

  deletePost() {
    this.postService.deleteById(this.postResponseDTO.id).subscribe({
      next: response => {
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Publicação excluída'});
        this.router.navigate(['']);
      },
      error: err => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro'})
    });
  }

  comment() {
    if (this.commentForm.valid) {
      const comment: ICommentRequestDTO = {
        content: this.commentForm.controls['content'].value,
        post: { id: this.postResponseDTO.id  }
      }
      this.commentService.save(comment).subscribe({
        next: response => {
          this.postResponseDTO.comments.push(response);
          this.commentForm.reset();
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Comentário adicionado'});
        },
        error: err => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro'})
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Formulário inválido' });
    }
  }

  deleteComment(commentId: string, index: number) {
    this.commentService.deleteById(commentId).subscribe({
      next: response => {
        this.postResponseDTO.comments.splice(index, 1);
        this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Comentário excluído'});
      },
      error: err => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro'})
    });
  }
}
