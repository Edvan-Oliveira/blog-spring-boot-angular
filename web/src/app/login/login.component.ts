import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {LoginService} from "./services/login.service";
import {LocalStorageUtils} from "../util/local-storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: response => {
          LocalStorageUtils.saveAuthenticatedUser(response);
          this.loginService.setAuthenticatedUser(true);
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Login bem-sucedido'});
          this.router.navigate(['']);
        },
      error: err => this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Confirme as informações'})
      })
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Formulário inválido' });
    }
  }

}
