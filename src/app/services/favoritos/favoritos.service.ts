import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {

  private chaveLocalStorage = 'produtos-favoritos';

  private getFavoritos(): string[] {
    const data = localStorage.getItem(this.chaveLocalStorage);
    return data ? JSON.parse(data) : [];
  }

  private salvarFavorito(ids: string[]) {
    localStorage.setItem(this.chaveLocalStorage, JSON.stringify(ids));
  }

  isFavorito(id: string): boolean {
    return this.getFavoritos().includes(id);
  }

  toggleFavorito(id: string) {
    const favoritos = this.getFavoritos();

    if (favoritos.includes(id)) {
      const atualizados = favoritos.filter(f => f !== id);
      this.salvarFavorito(atualizados);
    } else {
      favoritos.push(id);
      this.salvarFavorito(favoritos)
    }
  }

  listarFavoritos(): string[] {
    return this.getFavoritos();
  }
}
