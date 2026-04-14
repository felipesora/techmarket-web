import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const perfil = authService.getPerfilUsuario();

  if (perfil === 'ADMINISTRADOR') {
    return true;
  }

  router.navigate(['/acesso-negado']);
  return false;
};
