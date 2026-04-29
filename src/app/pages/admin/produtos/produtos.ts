import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto/produto.service';
import { CarregamentoComponent } from "../../../components/carregamento-component/carregamento-component";
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Produto } from '../../../types/produto';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-produtos',
  imports: [CarregamentoComponent, DatePipe, CurrencyPipe, NgClass, RouterLink],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos implements OnInit {
  carregando: boolean = false;
  produtosMaisVendidos: Produto[] = [];
  produtosEmPromocao: Produto[] = [];

  menuAbertoId: string | null = null;
  menuPosicao = { top: 0, left: 0 };

  modalDeletarProduto: boolean = false;
  produtoSelecionadoId: string | null = null;
  mensagemSucessoDeletarProduto: string | null = null;
  mensagemErroDeletarProduto: string | null = null;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    // Fecha o menu ao clicar fora
    document.addEventListener('click', () => {
      if (this.menuAbertoId) {
        this.menuAbertoId = null;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.carregando = true;
  
    forkJoin({
      maisVendidos: this.produtoService.getProdutosMaisVendidosAdmin(0, 5),
      promocoes: this.produtoService.getProdutosEmPromocaoAdmin(0, 5)
    })
    .pipe(
      finalize(() => {
        this.carregando = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (response) => {
        this.produtosMaisVendidos = response.maisVendidos.content;
        this.produtosEmPromocao = response.promocoes.content;
        this.cdr.detectChanges();

        console.log('Mais vendidos:', this.produtosMaisVendidos);
        console.log('Promoções:', this.produtosEmPromocao);
      },
      error: (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    })
  }

  calcularDesconto(precoUnitario: number, precoPromocional: number) {
    if (precoUnitario <= 0) return 0;

    const desconto = ((precoUnitario - precoPromocional) / precoUnitario) * 100;

    return Math.max(0, Math.round(desconto));
  }
  
  editarProduto(id: string) {
    this.router.navigate(['/admin/editar-produto', id]);
  }

  toggleMenu(id: string, event: MouseEvent) {
    event.stopPropagation();

    if (this.menuAbertoId === id) {
      this.menuAbertoId = null;
      return;
    }

    const botao = event.currentTarget as HTMLElement;
    const rect = botao.getBoundingClientRect();

    this.menuPosicao = {
      top: rect.bottom + 4,
      left: rect.right - 160
    };

    this.menuAbertoId = id;
  }

  fecharMenu(id: string) {
    if (this.menuAbertoId === id) {
      this.menuAbertoId = null;
    }
  }

  abrirModal(idProduto: string) {
    this.produtoSelecionadoId = idProduto;
    this.modalDeletarProduto = true;
    this.cdr.detectChanges();
  };

  fecharModal() {
    this.modalDeletarProduto = false;
    this.produtoSelecionadoId = null;
    this.cdr.detectChanges();
  }

  deletarProduto(idProduto: string) {
    this.mensagemSucessoDeletarProduto = null;
    this.mensagemErroDeletarProduto = null;

    this.produtoService.deletarProduto(idProduto).subscribe({
      next: (response) => {
        console.log('Produto deletada com sucesso: ', response);
        this.mensagemSucessoDeletarProduto = "Produto deletado com sucesso!";
        this.cdr.detectChanges();

        setTimeout(() => {
          this.listarProdutos();
          this.fecharModal();
          this.mensagemSucessoDeletarProduto = null;
          this.cdr.detectChanges();
        }, 2000);
      },
      error: (error) => {
        console.error('Erro ao deletar produto:', error);
        this.mensagemErroDeletarProduto = "Erro ao deletar produto.";
        this.cdr.detectChanges();
      }
    })
  };
}
