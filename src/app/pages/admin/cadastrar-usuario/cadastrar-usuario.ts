import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { cpfValidator, emailValidator, nomeValidator, obrigatorioValidator, senhaValidator } from './validatorsCadastroUsuario';
import { NgxMaskDirective } from 'ngx-mask';
import { UsuarioCadastro } from '../../../types/usuario';
import { IdentityService } from '../../../services/identity/identity.service';

@Component({
  selector: 'app-cadastrar-usuario',
  imports: [RouterLink, ReactiveFormsModule, NgClass, NgxMaskDirective],
  templateUrl: './cadastrar-usuario.html',
  styleUrl: './cadastrar-usuario.css',
})
export class CadastrarUsuario {

  form!: FormGroup;
  mostrarSenha = false;
  submitted = false;
  mensagem: string | null = null;
  tipoMensagem: 'sucesso' | 'erro' | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private identityService: IdentityService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group(
      {
        nome: ['', [nomeValidator(), obrigatorioValidator()]],
        email: ['', [emailValidator(), obrigatorioValidator()]],
        cpf: ['', [cpfValidator(), obrigatorioValidator()]],
        senha: ['', [senhaValidator(), obrigatorioValidator()]],
      }
    );
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  };

  cadastrarUsuario() {
    this.submitted = true;
    this.mensagem = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuarioFormulario = this.form.value;
    
    const cpfSemMascara = usuarioFormulario.cpf.replace(/\D/g, '');

    const usuario: UsuarioCadastro = {
      nome: usuarioFormulario.nome,
      email: usuarioFormulario.email,
      cpf: cpfSemMascara,
      senha: usuarioFormulario.senha,
      perfil: "ADMINISTRADOR",
    };

    this.identityService.criarUsuario(usuario).subscribe({
      next: () => {
        this.tipoMensagem = 'sucesso';
        this.mensagem = 'Administrador cadastrado com sucesso!';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/admin/usuarios']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erro HTTP:', err);
        console.log('Erro completo: ', err.error);
        console.log(err.error.errors);
        console.log('Mensagem: ', this.mensagem);

        if (err.error.message === "CPF já cadastrado para este perfil") {
          this.tipoMensagem = 'erro';
          this.mensagem = 'CPF já cadastrado.';
          this.cdr.detectChanges();
          console.log('Mensagem: ', this.mensagem);
          return;
        }

        if (err.error.message === "Email já cadastrado") {
          this.tipoMensagem = 'erro';
          this.mensagem = 'Email já cadastrado.';
          this.cdr.detectChanges();
          console.log('Mensagem: ', this.mensagem);
          return;
        }

        this.tipoMensagem = 'erro';
        this.mensagem = 'Erro ao cadastrar administrador. Tente novamente mais tarde.';
        this.cdr.detectChanges();
        console.log('Mensagem: ', err);
      },
    });
  };
}
