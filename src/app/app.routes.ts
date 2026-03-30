import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { Cadastro } from './pages/cadastro/cadastro';
import { ProdutosFavoritos } from './pages/produtos-favoritos/produtos-favoritos/produtos-favoritos';

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
        }
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
