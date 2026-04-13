import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Cadastro } from './pages/cadastro/cadastro';
import { ProdutosFavoritos } from './pages/produtos-favoritos/produtos-favoritos';
import { ListaProdutos } from './pages/lista-produtos/lista-produtos';
import { DetalhesProduto } from './pages/detalhes-produto/detalhes-produto';
import { Carrinho } from './pages/carrinho/carrinho';
import { ConfirmarPedido } from './pages/confirmar-pedido/confirmar-pedido';
import { Pagamento } from './pages/pagamento/pagamento';
import { MeusDados } from './pages/meus-dados/meus-dados';
import { MeusPedidos } from './pages/meus-pedidos/meus-pedidos';
import { authGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
        {
            path: '',
            component: Home
        },
        {
            path: 'favoritos',
            component: ProdutosFavoritos,
            canActivate: [authGuard]
        },
        {
            path: 'produtos',
            component: ListaProdutos
        },
        {
            path: 'detalhes-produto/:id',
            component: DetalhesProduto
        },
        {
            path: 'carrinho',
            component: Carrinho,
            canActivate: [authGuard]
        },
        {
            path: 'confirmacao-pedido',
            component: ConfirmarPedido,
            canActivate: [authGuard]
        },
        {
            path: 'pagamento/:idPedido',
            component: Pagamento,
            canActivate: [authGuard]
        },
        {
            path: 'meus-dados',
            component: MeusDados,
            canActivate: [authGuard]
        },
        {
            path: 'meus-pedidos',
            component: MeusPedidos,
            canActivate: [authGuard]
        },
        ]
    },
    {
        path: 'auth',
        component: AuthLayout,
        children: [
        {
            path: 'login',
            component: Login
        },
        {
            path: 'cadastro',
            component: Cadastro
        }
        ]
    }
];
