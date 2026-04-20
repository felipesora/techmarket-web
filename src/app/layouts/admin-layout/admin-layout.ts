import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoAdmin } from "../cabecalho-admin/cabecalho-admin";
import { NavbarAdmin } from "../navbar-admin/navbar-admin";
import { Rodape } from "../rodape/rodape";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, CabecalhoAdmin, NavbarAdmin, Rodape],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}
