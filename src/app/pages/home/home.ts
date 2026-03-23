import { Component } from '@angular/core';
import { Produto } from '../../components/produto/produto';

@Component({
  selector: 'app-home',
  imports: [Produto],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
