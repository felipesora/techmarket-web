import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { IdentityService } from '../../../services/identity/identity.service';
import { emailValidator, senhaValidator } from '../cadastro/validatorsCadastro';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  mostrarSenha = false;
  form!: FormGroup;
  submitted = false;

  mensagem: string | null = null;
  tipoMensagem: 'sucesso' | 'erro' | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private identityService: IdentityService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group(
      {
        email: ['', emailValidator()],
        senha: ['', senhaValidator()],
      }
    );
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  logar() {
    this.submitted = true;
    this.mensagem = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuario = this.form.value;

    this.identityService.fazerLogin(usuario).subscribe({
      next: (response) => {
        const token = response.token;
        localStorage.setItem('tokenUser', token);

        this.authService.getUsuarioToken();

        this.tipoMensagem = 'sucesso';
        this.mensagem = 'Login efetuado com sucesso!';
        this.cdr.detectChanges();

        const perfil = localStorage.getItem('perfil');

        if (perfil === "ADMINISTRADOR") {
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 2000);

          return;
        }

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erro HTTP:', err);
        console.log('Erro completo: ', err.error);
        console.log(err.error.errors);
        console.log('Mensagem: ', this.mensagem);

        if (err.status === 0) {
          this.tipoMensagem = 'erro';
          this.mensagem = 'Servidor indisponível. Tente novamente em instantes.';
          this.cdr.detectChanges();
          console.log('Mensagem: ', this.mensagem);
          return;
        }

        if (err.error.message === "Email ou senha inválidos") {
          this.tipoMensagem = 'erro';
          this.mensagem = 'Email ou senha inválidos.';
          console.log('Mensagem: ', this.mensagem);
          this.cdr.detectChanges();
          return;
        }

        this.tipoMensagem = 'erro';
        this.mensagem = 'Erro no login. Tente novamente mais tarde.';
        this.cdr.detectChanges();
        console.log('Mensagem: ', this.mensagem);
      }
    })
  }
}
