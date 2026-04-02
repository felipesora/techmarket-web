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
            component: ProdutosFavoritos
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
            component: Carrinho
        },
        {
            path: 'confirmacao-pedido',
            component: ConfirmarPedido
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
