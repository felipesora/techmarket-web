import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayout,
        children: [
        {
            path: '',
            component: Home
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
        }
        ]
    }
];
