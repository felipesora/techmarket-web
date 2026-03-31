import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-cabecalho',
  imports: [RouterLink, ɵInternalFormsSharedModule, FormsModule],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css',
})
export class Cabecalho {

  busca: string = '';

  constructor(private router: Router) {}

  pesquisar() {
    const termo = this.busca.trim();

    if (!termo) return;
    
    this.router.navigate(['/produtos'], {
      queryParams: { busca: termo }
    });

    this.busca = '';
  }
}
