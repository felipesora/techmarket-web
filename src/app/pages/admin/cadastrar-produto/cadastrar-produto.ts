import { ChangeDetectorRef, Component } from '@angular/core';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from '../../../services/produto/produto.service';
import { categoriaValidator, codigoValidator, descricaoValidator, marcaValidator, nomeValidator, numeroNaoNegativoValidator, obrigatorioValidator, precoPromocionalValidator, statusValidator } from './validatorsProduto';

@Component({
  selector: 'app-cadastrar-produto',
  imports: [CarregamentoComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './cadastrar-produto.html',
  styleUrl: './cadastrar-produto.css',
})
export class CadastrarProduto {
  carregando: boolean = false;
  form!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.formBuilder.group(
      {
        codigo: ['', [codigoValidator(), obrigatorioValidator()]],
        categoria: ['', [categoriaValidator(), obrigatorioValidator()]],
        nome: ['', [nomeValidator(), obrigatorioValidator()]],
        descricao: ['', [descricaoValidator()]],
        precoNormal: ['', [numeroNaoNegativoValidator(), obrigatorioValidator()]],
        precoPromocional: ['', [numeroNaoNegativoValidator()]],
        estoque: ['', [numeroNaoNegativoValidator(), obrigatorioValidator()]],
        marca: ['', [marcaValidator(), obrigatorioValidator()]],
        status: ['', [statusValidator(), obrigatorioValidator()]],
      },
      {
        validators: precoPromocionalValidator()
      }
    );
  }

  cadastrarProduto() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
