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
import { ListarProdutos } from './pages/admin/listar-produtos/listar-produtos';
import { CadastrarProduto } from './pages/admin/cadastrar-produto/cadastrar-produto';
import { EditarProduto } from './pages/admin/editar-produto/editar-produto';
import { Pedidos } from './pages/admin/pedidos/pedidos';
import { ListarPedidos } from './pages/admin/listar-pedidos/listar-pedidos';
import { DetalhesPedido } from './pages/admin/detalhes-pedido/detalhes-pedido';
import { Usuarios } from './pages/admin/usuarios/usuarios';
import { ListarUsuarios } from './pages/admin/listar-usuarios/listar-usuarios';
import { CadastrarUsuario } from './pages/admin/cadastrar-usuario/cadastrar-usuario';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayout,
        children: [
            { path: 'login', component: Login, title: "TechMarket - Login" },
            { path: 'cadastro', component: Cadastro, title: "TechMarket - Cadastro" }
        ]
    },
    {
        path: 'admin',
        component: AdminLayout,
        children: [
            { path: 'dashboard', component: Dashboard, canActivate: [authGuard, adminGuard], title: "TechMarket - Dashboard" },
            { path: 'meus-dados', component: MeusDados, canActivate: [authGuard, adminGuard], title: "TechMarket - Meu Dados" },
            { path: 'produtos', component: Produtos, canActivate: [authGuard, adminGuard], title: "TechMarket - Produtos" },
            { path: 'listar-produtos', component: ListarProdutos, canActivate: [authGuard, adminGuard], title: "TechMarket - Listar Produtos" },
            { path: 'cadastrar-produto', component: CadastrarProduto, canActivate: [authGuard, adminGuard], title: "TechMarket - Cadastrar Produto" },
            { path: 'editar-produto/:id', component: EditarProduto, canActivate: [authGuard, adminGuard], title: "TechMarket - Editar Produto" },
            { path: 'pedidos', component: Pedidos, canActivate: [authGuard, adminGuard], title: "TechMarket - Pedidos" },
            { path: 'listar-pedidos', component: ListarPedidos, canActivate: [authGuard, adminGuard], title: "TechMarket - Listar Pedidos" },
            { path: 'detalhes-pedido/:id', component: DetalhesPedido, canActivate: [authGuard, adminGuard], title: "TechMarket - Detalhes do Pedido" },
            { path: 'usuarios', component: Usuarios, canActivate: [authGuard, adminGuard], title: "TechMarket - Usuários" },
            { path: 'listar-usuarios', component: ListarUsuarios, canActivate: [authGuard, adminGuard], title: "TechMarket - Listar Usuários" },
            { path: 'cadastrar-usuario', component: CadastrarUsuario, canActivate: [authGuard, adminGuard], title: "TechMarket - Cadastrar Usuário" },
        ]
    },
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', component: Home, title: "TechMarket"},
            { path: 'favoritos', component: ProdutosFavoritos, canActivate: [authGuard], title: "TechMarket - Favoritos" },
            { path: 'produtos', component: ListaProdutos, title: "TechMarket - Produtos"  },
            { path: 'detalhes-produto/:id', component: DetalhesProduto, title: "TechMarket - Detalhes do Produto"},
            { path: 'carrinho', component: Carrinho, canActivate: [authGuard], title: "TechMarket - Carrinho" },
            { path: 'confirmacao-pedido', component: ConfirmarPedido, canActivate: [authGuard], title: "TechMarket - Confirmar Pedido" },
            { path: 'pagamento/:idPedido', component: Pagamento, canActivate: [authGuard], title: "TechMarket - Pagamento" },
            { path: 'meus-dados', component: MeusDados, canActivate: [authGuard], title: "TechMarket - Meus Dados" },
            { path: 'meus-pedidos', component: MeusPedidos, canActivate: [authGuard], title: "TechMarket - Meus Pedidos" },
            { path: 'acesso-negado', component: AcessoNegado, title: "TechMarket - Acesso Negado" }
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
            { path: '', component: NaoEncontrado, title: "TechMarket - Não Encontrado" }
        ]
    }
];
