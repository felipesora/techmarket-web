import { ChangeDetectorRef, Component } from '@angular/core';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from '../../../services/produto/produto.service';
import { categoriaValidator, codigoValidator, descricaoValidator, marcaValidator, nomeValidator, numeroNaoNegativoValidator, obrigatorioValidator, precoPromocionalValidator, statusValidator } from './validatorsProduto';
import { ProdutoRequest } from '../../../types/produto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cadastrar-produto',
  imports: [CarregamentoComponent, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './cadastrar-produto.html',
  styleUrl: './cadastrar-produto.css',
})
export class CadastrarProduto {
  carregando: boolean = false;
  form!: FormGroup;
  submitted = false;
  mensagem: string | null = null;
  tipoMensagem: 'sucesso' | 'erro' | null = null;

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

    const formProduto = this.form.value;

    const produto: ProdutoRequest = {
      codigo: formProduto.codigo,
      nome: formProduto.nome,
      descricao: formProduto.descricao ? formProduto.descricao : null,
      categoria: formProduto.categoria,
      marca: formProduto.marca,
      precoUnitario: formProduto.precoNormal,
      precoPromocional: formProduto.precoPromocional !== '' ? formProduto.precoPromocional : null,
      estoque: formProduto.estoque,
    };

    this.produtoService.cadastrarProduto(produto).subscribe({
      next: () => {
        this.tipoMensagem = 'sucesso';
        this.mensagem = 'Produto cadastrado com sucesso!';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/admin/produtos']);
        }, 2000);
      },
      error: (err) => {
        this.tipoMensagem = 'erro';
        this.mensagem = 'Erro ao cadastrar produto. Tente novamente mais tarde.';
        this.cdr.detectChanges();
        console.log('Mensagem: ', err);
      }
    });
    
  }
}
