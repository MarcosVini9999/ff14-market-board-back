# FF14 Market Board Back-End

## Project Description

The "FF14 Market Board Back" is an API developed to manage a market system inspired by the game Final Fantasy XIV. This project allows players to manage their inventories and item offers, facilitating interaction between them and the exchange of resources.

Entendi! Aqui está a frase ajustada com as duas rotas do Swagger listadas:

## Swagger

The project has Swagger installed, so you can access the following routes:

- **API Documentation**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **API JSON**: [http://localhost:3000/api-json](http://localhost:3000/api-json)

Aqui está a listagem das rotas da API com base no JSON que você forneceu:

## API Routes

### General

- **GET /**: Retrieves a greeting message.

### Players

- **POST /players**: Creates a new player.
- **GET /players**: Retrieves all players.
- **GET /players/{id}**: Retrieves a player by ID.

### Items

- **POST /items**: Creates a new item.
- **GET /items**: Retrieves all items.
- **GET /items/{id}**: Retrieves an item by ID.
- **PUT /items/{id}**: Updates an existing item by ID.
- **DELETE /items/{id}**: Deletes an item by ID.

### Inventories

- **POST /inventories**: Creates a new inventory.
- **GET /inventories**: Retrieves all inventories.
- **GET /inventories/{id}**: Retrieves an inventory by ID.
- **PUT /inventories/{id}**: Updates an existing inventory by ID.
- **DELETE /inventories/{id}**: Deletes an inventory by ID.

### Offers

- **POST /offers**: Creates a new offer.
- **GET /offers**: Retrieves all offers.
- **GET /offers/{id}**: Retrieves an offer by ID.
- **PUT /offers/{id}**: Updates an existing offer by ID.
- **DELETE /offers/{id}**: Deletes an offer by ID.

## Project Structure

The project structure is organized into modules, each responsible for a specific part of the system:

- **Inventories**: Management of player inventories.
- **Offers**: Management of item offers in the market (in development).
- **Players**: Management of player data.
- **Items**: Management of items available in the market.

## Inventories Module

The inventories module is responsible for managing the items that players own, allowing them to add, update, and remove items from their inventory.

### Features

- **Create Inventory**: Allows a player to add a new item to their inventory.
- **List Inventories**: Returns all items from all players.
- **Fetch Inventory by ID**: Returns the details of a specific inventory.
- **Update Inventory**: Updates the quantity of an existing item in the inventory.
- **Remove Inventory**: Removes an item from a player's inventory.

## Offers Module

The offers module will be responsible for managing item offers in the market. Planned features include:

- **Create Offer**: Allow players to create new offers for items.
- **List Offers**: List all available offers in the market.
- **Update Offer**: Update details of an existing offer.
- **Remove Offer**: Remove an offer from the market.
- **Get By Id**: Get an offer by param id.

## Players Module

The players module manages player data, allowing them to register and update their information.

### Features

- **Create Player**: Adds a new player to the system.
- **List Players**: Returns all registered players.
- **Fetch Player by ID**: Returns the details of a specific player.

## Items Module

The items module manages the items available in the market, allowing players to query and interact with items.

### Features

- **Create Item**: Adds a new item to the system.
- **List Items**: Returns all available items.
- **Fetch Item by ID**: Returns the details of a specific item.
- **Update Item**: Updates the information of an existing item.
- **Remove Item**: Removes an item from the system.

## Technologies Used

- **NestJS**: Framework for building APIs in Node.js.
- **Prisma**: ORM for database interaction.
- **TypeScript**: Programming language to ensure type safety.
- **Jest**: Testing framework.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your_username/ff14-market-board-back.git
   cd ff14-market-board-back
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database in the .env file. You can use the .env.example file as a reference.
4. Start the database using Docker Compose, assuming you don't have any database:
   ```bash
   docker-compose up -d
   ```
5. Apply the Prisma migrations to the database:
   ```bash
   npx prisma migrate deploy
   ```

## Running the Project

1. Compile the project with one of the commands:

   ```bash
   # Dev
   $ npm run start

   # Watch
   $ npm run start:dev

   # Production
   $ npm run start:prod
   ```

## Running Tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Developer

- Marcos Vinicius Andrade de Sousa <marcosviniciusandradedesousa@hotmail.com>
