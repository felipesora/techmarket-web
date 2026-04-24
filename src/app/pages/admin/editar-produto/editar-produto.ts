import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from '../../../services/produto/produto.service';
import { categoriaValidator, codigoValidator, descricaoValidator, marcaValidator, nomeValidator, numeroNaoNegativoValidator, obrigatorioValidator, precoPromocionalValidator, statusValidator } from '../cadastrar-produto/validatorsProduto';
import { ProdutoEditRequest } from '../../../types/produto';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-editar-produto',
  imports: [CarregamentoComponent, RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './editar-produto.html',
  styleUrl: './editar-produto.css',
})
export class EditarProduto implements OnInit {
  carregando: boolean = false;
  form!: FormGroup;
  submitted = false;
  mensagem: string | null = null;
  tipoMensagem: 'sucesso' | 'erro' | null = null;

  imagemSelecionada: File | null = null;
  imagemPreview: string | null = null;

  produtoId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
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

  ngOnInit() {
    this.produtoId = this.route.snapshot.paramMap.get('id')!;
    this.carregarProduto();
  }

  carregarProduto() {
    this.carregando = true;
    this.produtoService.getProdutoPorId(this.produtoId).subscribe({
      next: (produto) => {
        this.form.patchValue({
          codigo: produto.codigo,
          categoria: produto.categoria,
          nome: produto.nome,
          descricao: produto.descricao,
          precoNormal: produto.precoUnitario,
          precoPromocional: produto.precoPromocional,
          estoque: produto.estoque,
          marca: produto.marca,
          status: produto.status,
        });

        console.log(produto.imagemId);
        

        if (produto.imagemId) {
          this.imagemPreview = `http://localhost:8080/techmarket-product-service/produtos/imagem/${produto.imagemId}`;
        }

        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.tipoMensagem = 'erro';
        this.mensagem = 'Erro ao carregar produto.';
        this.carregando = false;
        this.cdr.detectChanges();
        console.log(err);
      }
    });
  }

  editarProduto() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formProduto = this.form.value;

    const produto: ProdutoEditRequest = {
      codigo: formProduto.codigo,
      nome: formProduto.nome,
      descricao: formProduto.descricao ? formProduto.descricao : null,
      categoria: formProduto.categoria,
      marca: formProduto.marca,
      precoUnitario: formProduto.precoNormal,
      precoPromocional: formProduto.precoPromocional !== '' ? formProduto.precoPromocional : null,
      estoque: formProduto.estoque,
      status: formProduto.status,
    };

    this.produtoService.editarProduto(this.produtoId, produto).subscribe({
      next: (response) => {
        this.tipoMensagem = 'sucesso';
        this.mensagem = 'Produto editado com sucesso!';

        if (this.imagemSelecionada) {
          this.cadastrarImagemDoProduto(response.id, this.imagemSelecionada);
        }

        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/admin/produtos']);
        }, 2000);
      },
      error: (err) => {
        this.tipoMensagem = 'erro';
        this.mensagem = 'Erro ao editar produto. Tente novamente mais tarde.';
        this.cdr.detectChanges();
        console.log('Mensagem: ', err);
      }
    });

  };

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // Validação de tipo
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      this.tipoMensagem = 'erro';
      this.mensagem = 'A imagem deve ser PNG ou JPG';
      return;
    }

    this.imagemSelecionada = file;

    // Gerar preview
    const reader = new FileReader();

    reader.onload = () => {
      this.imagemPreview = reader.result as string;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  };

  cadastrarImagemDoProduto(idProduto: string, file: File) {
    if (!file) return;

    this.produtoService.uploadImagemProduto(idProduto, file).subscribe({
      next: () => {
        this.tipoMensagem = 'sucesso';
        this.mensagem = 'Imagem atualizada com sucesso!';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.tipoMensagem = 'erro';
        this.mensagem = 'Erro ao enviar imagem';
        this.cdr.detectChanges();
        console.log(err);
      }
    });
  };

  removerImagem() {
    this.imagemSelecionada = null;
    this.imagemPreview = null;
    this.cdr.detectChanges();
  }
}
