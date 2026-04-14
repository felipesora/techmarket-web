import { CanMatchFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const adminMatchGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const perfil = authService.getPerfilUsuario();

  return perfil === 'ADMINISTRADOR';
};
