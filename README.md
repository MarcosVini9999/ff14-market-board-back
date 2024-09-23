# FF14 Market Board Back-End

## Descrição do Projeto

O "FF14 Market Board Back" é uma API desenvolvida para gerenciar um sistema de mercado inspirado no jogo Final Fantasy XIV. Este projeto permite que os jogadores gerenciem seus inventários e ofertas de itens, facilitando a interação entre eles e a troca de recursos.

## Estrutura do Projeto

A estrutura do projeto é organizada em módulos, cada um responsável por uma parte específica do sistema:

- **Inventories**: Gerenciamento de inventários de jogadores.
- **Offers**: Gerenciamento de ofertas de itens no mercado (em desenvolvimento).
- **Players**: Gerenciamento de dados dos jogadores.
- **Items**: Gerenciamento de itens disponíveis no mercado.

## Módulo de Inventários

O módulo de inventários é responsável por gerenciar os itens que os jogadores possuem, permitindo adicionar, atualizar e remover itens do inventário.

### Funcionalidades

- **Criar Inventário**: Permite que um jogador adicione um novo item ao seu inventário.
- **Listar Inventários**: Retorna todos os itens de todos os jogadores.
- **Buscar Inventário por ID**: Retorna os detalhes de um inventário específico.
- **Atualizar Inventário**: Atualiza a quantidade de um item existente no inventário.
- **Remover Inventário**: Remove um item do inventário de um jogador.

## Módulo de Ofertas (Em Desenvolvimento)

O módulo de ofertas será responsável por gerenciar as ofertas de itens no mercado. As funcionalidades previstas incluem:

- **Criar Oferta**: Permitir que os jogadores criem novas ofertas para itens.
- **Listar Ofertas**: Listar todas as ofertas disponíveis no mercado.
- **Atualizar Oferta**: Atualizar detalhes de uma oferta existente.
- **Remover Oferta**: Remover uma oferta do mercado.

## Módulo de Players

O módulo de players gerencia os dados dos jogadores, permitindo que eles se cadastrem e atualizem suas informações.

### Funcionalidades

- **Criar Jogador**: Adiciona um novo jogador ao sistema.
- **Listar Jogadores**: Retorna todos os jogadores cadastrados.
- **Buscar Jogador por ID**: Retorna os detalhes de um jogador específico.
- **Atualizar Jogador**: Atualiza as informações de um jogador existente.
- **Remover Jogador**: Remove um jogador do sistema.

## Módulo de Items

O módulo de items gerencia os itens disponíveis no mercado, permitindo que jogadores consultem e interajam com os itens.

### Funcionalidades

- **Criar Item**: Adiciona um novo item ao sistema.
- **Listar Itens**: Retorna todos os itens disponíveis.
- **Buscar Item por ID**: Retorna os detalhes de um item específico.
- **Atualizar Item**: Atualiza as informações de um item existente.
- **Remover Item**: Remove um item do sistema.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de APIs em Node.js.
- **Prisma**: ORM para interação com o banco de dados.
- **TypeScript**: Linguagem de programação para garantir segurança de tipos.
- **Jest**: Framework de testes.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu_usuario/ff14-market-board-back.git
   cd ff14-market-board-back
   ```
2. Instale as dependências:
   ```bash
    npm install
   ```
3. Configure o banco de dados no arquivo .env. Você pode usar o arquivo .env.example como referência.
4. Inicie o banco de dados utilizando o Docker Compose, tenha em mente que isso é visando que você não tem nenhum banco:
   ```bash
    docker-compose up -d
   ```
5. Aplique as migrations do prisma no banco
   ```bash
    npx prisma migrate deploy
   ```

## Rodando o Projeto

1. Compile o projeto com um dos comandos:

   ```bash
   # Dev
   $ npm run start

   # Watch
   $ npm run start:dev

   # Produção
   $ npm run start:prod
   ```

## Rodando os testes

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Autores

- Marcos Vinicius Andrade de Sousa <marcosviniciusandradedesousa@hotmail.com>
