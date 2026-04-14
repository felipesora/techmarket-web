import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cabecalho-admin',
  imports: [RouterLink],
  templateUrl: './cabecalho-admin.html',
  styleUrl: './cabecalho-admin.css',
})
export class CabecalhoAdmin {

  constructor(private authService: AuthService, private router: Router) {}
  
  fazerLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
