import {Component} from '@angular/core';
import {RegisterService} from "./services/register.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup

  constructor(
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  register() {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value).subscribe({
        next: r => {
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Registro bem-sucedido'});
          this.router.navigate(['entrar']);
        },
        error: err => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro'})
      })
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Formulário inválido' });
    }
  }
}
