import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from './layouts/cabecalho/cabecalho';
import { Navbar } from './layouts/navbar/navbar';
import { Rodape } from "./layouts/rodape/rodape";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecalho, Navbar, Rodape],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('techmarket-web');
}
