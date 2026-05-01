<div align="center">

# 🖥️ TechMarket Web

### Aplicação frontend da plataforma TechMarket responsável pela interface do usuário e interação com os microsserviços.

<br/>

[![Angular](https://img.shields.io/badge/Angular_21-DD0031?style=for-the-badge\&logo=angular\&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)](https://www.docker.com/)

</div>

---

## 📋 Índice

* [Sobre o Web](#-sobre-o-web)
* [Principais Funcionalidades](#️-principais-funcionalidades)
* [Arquitetura e Papel no Sistema](#-arquitetura-e-papel-no-sistema)
* [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
* [Dependências Relevantes](#-dependências-relevantes)
* [Boas Práticas Aplicadas](#-boas-práticas-aplicadas)
* [Integração com Outros Serviços](#-integração-com-outros-serviços)
* [Repositórios](#-repositórios)
* [Autor](#-autor)

---

## 💡 Sobre o Web

O **TechMarket Web** é a aplicação frontend da plataforma, responsável por fornecer a interface de usuário para navegação, consulta de produtos, gerenciamento de carrinho e fluxo de compra.

Ele se comunica exclusivamente com o backend através do **API Gateway**, garantindo desacoplamento total entre frontend e microsserviços.

O projeto foi desenvolvido com foco em:

* **Experiência do usuário (UX/UI)**
* **Performance**
* **Responsividade (Mobile First)**
* **Escalabilidade do frontend**

---

## ⚙️ Principais Funcionalidades

* 🛍️ Listagem de produtos
* 🔍 Filtros e busca por nome/categoria
* 📄 Página de detalhes do produto
* 🛒 Carrinho de compras
* ✔️ Finalização de pedidos
* 🔐 Login e autenticação
* 📊 Visualização de pedidos
* ⚡ Comunicação com APIs via Gateway

---

## 🧱 Arquitetura e Papel no Sistema

O frontend se posiciona como:

```id="u3k9sl"
Usuário → Angular (Frontend) → Gateway → Microsserviços
```

### Responsabilidades:

| Responsabilidade | Descrição                  |
| ---------------- | -------------------------- |
| Interface        | Renderização de telas      |
| Interação        | Entrada e ações do usuário |
| Comunicação      | Consumo de APIs REST       |
| Estado           | Gerenciamento reativo      |
| Navegação        | Controle de rotas          |

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* Angular 21
* TypeScript
* HTML5

### Estilização

* Tailwind CSS (utility-first)
* Design responsivo

### Arquitetura

* SPA (Single Page Application)
* Consumo de APIs REST

### Infra

* Docker
* Nginx (deploy)

---

## 📦 Dependências Relevantes

Principais dependências do projeto:

* `@angular/core`
* `@angular/router`
* `@angular/common`
* `rxjs`
* `zone.js`
* `tailwindcss`

---

## 📊 Boas Práticas Aplicadas

* Arquitetura baseada em componentes
* Separação de responsabilidades (Component / Service)
* Uso de Services para comunicação HTTP
* Interceptors para inclusão automática de JWT
* Guards para proteção de rotas
* Gerenciamento reativo com RxJS
* Estrutura modular (core / shared / features)
* Uso de Tailwind para padronização visual
* Configuração por ambiente (dev/prod)

---

## 🔗 Integração com Outros Serviços

| Serviço          | Integração                         |
| ---------------- | ---------------------------------- |
| Gateway Service  | Ponto único de acesso              |
| Identity Service | Autenticação (login/JWT)           |
| Product Service  | Listagem e detalhes de produtos    |
| Order Service    | Criação e consulta de pedidos      |
| Payment Service  | Atualização de status de pagamento |

---

## 📁 Repositórios

O TechMarket é organizado como um **monorepo com submódulos Git**. Cada serviço possui seu próprio repositório:

| Serviço | Descrição | Repositório |
|---------|-----------|-------------|
| 🗂️ **techmarket** | Repositório principal (monorepo + Docker Compose) | [github.com/felipesora/techmarket](https://github.com/felipesora/techmarket) |
| 🔍 **discovery-service** | Eureka Server para service discovery | [github.com/felipesora/techmarket-discovery-service](https://github.com/felipesora/techmarket-discovery-service) |
| 🌐 **gateway-service** | API Gateway com Spring Cloud Gateway | [github.com/felipesora/techmarket-gateway-service](https://github.com/felipesora/techmarket-gateway-service) |
| 🔐 **identity-service** | Autenticação e gerenciamento de usuários (JWT) | [github.com/felipesora/techmarket-identity-service](https://github.com/felipesora/techmarket-identity-service) |
| 📦 **product-service** | Catálogo e gerenciamento de produtos | [github.com/felipesora/techmarket-product-service](https://github.com/felipesora/techmarket-product-service) |
| 🛒 **order-service** | Criação e acompanhamento de pedidos | [github.com/felipesora/techmarket-order-service](https://github.com/felipesora/techmarket-order-service) |
| 💳 **payment-service** | Processamento de pagamentos via mensageria | [github.com/felipesora/techmarket-payment-service](https://github.com/felipesora/techmarket-payment-service) |
| 🖥️ **techmarket-web** | Frontend da plataforma em Angular | [github.com/felipesora/techmarket-web](https://github.com/felipesora/techmarket-web) |

---

## 👨‍💻 Autor

Desenvolvido por **Felipe Sora**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/felipesora)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/felipesora)