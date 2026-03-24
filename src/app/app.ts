import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from './layout/cabecalho/cabecalho';
import { Navbar } from './layout/navbar/navbar';
import { Rodape } from "./layout/rodape/rodape";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecalho, Navbar, Rodape],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('techmarket-web');
}
