import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from './layout/cabecalho/cabecalho';
import { Navbar } from './layout/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecalho, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('techmarket-web');
}
