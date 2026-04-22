import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Cadastro } from './pages/public/cadastro/cadastro';
import { ProdutosFavoritos } from './pages/public/produtos-favoritos/produtos-favoritos';
import { ListaProdutos } from './pages/public/lista-produtos/lista-produtos';
import { DetalhesProduto } from './pages/public/detalhes-produto/detalhes-produto';
import { Carrinho } from './pages/public/carrinho/carrinho';
import { ConfirmarPedido } from './pages/public/confirmar-pedido/confirmar-pedido';
import { Pagamento } from './pages/public/pagamento/pagamento';
import { MeusDados } from './pages/public/meus-dados/meus-dados';
import { MeusPedidos } from './pages/public/meus-pedidos/meus-pedidos';
import { authGuard } from './guards/auth/auth-guard';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { AcessoNegado } from './pages/public/acesso-negado/acesso-negado';
import { adminGuard } from './guards/admin/admin-guard';
import { NaoEncontrado } from './pages/public/nao-encontrado/nao-encontrado';
import { adminMatchGuard } from './guards/admin/admin-match-guard';
import { Produtos } from './pages/admin/produtos/produtos';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayout,
        children: [
            { path: 'login', component: Login },
            { path: 'cadastro', component: Cadastro }
        ]
    },
    {
        path: 'admin',
        component: AdminLayout,
        children: [
            { path: 'dashboard', component: Dashboard, canActivate: [authGuard, adminGuard] },
            { path: 'meus-dados', component: MeusDados, canActivate: [authGuard, adminGuard] },
            { path: 'produtos', component: Produtos, canActivate: [authGuard, adminGuard] },
        ]
    },
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', component: Home},
            { path: 'favoritos', component: ProdutosFavoritos, canActivate: [authGuard] },
            { path: 'produtos', component: ListaProdutos },
            { path: 'detalhes-produto/:id', component: DetalhesProduto },
            { path: 'carrinho', component: Carrinho, canActivate: [authGuard] },
            { path: 'confirmacao-pedido', component: ConfirmarPedido, canActivate: [authGuard] },
            { path: 'pagamento/:idPedido', component: Pagamento, canActivate: [authGuard] },
            { path: 'meus-dados', component: MeusDados, canActivate: [authGuard] },
            { path: 'meus-pedidos', component: MeusPedidos, canActivate: [authGuard] },
            { path: 'acesso-negado', component: AcessoNegado }
        ]
    },
    {
        path: '**',
        component: AdminLayout,
        canMatch: [adminMatchGuard],
        children: [
            { path: '', component: NaoEncontrado }
        ]
    },
    {
        path: '**',
        component: MainLayout,
        children: [
            { path: '', component: NaoEncontrado }
        ]
    }
];
