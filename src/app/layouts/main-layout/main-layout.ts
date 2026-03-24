import { Component } from '@angular/core';
import { Cabecalho } from "../cabecalho/cabecalho";
import { Navbar } from "../navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { Rodape } from "../rodape/rodape";

@Component({
  selector: 'app-main-layout',
  imports: [Cabecalho, Navbar, RouterOutlet, Rodape],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
