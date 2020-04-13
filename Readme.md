# RESTful API + GraphQL Node Server Boilerplate

## Features

- Log systems
- MongoDB
- Restful API endpoints
- GraphQL endpoints
- Linting
- Docker

## Getting Started

### Installation

```bash
yarn install
```

Environment varibales:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

### Commands

Running locally:

```bash
yarn dev
```

Docker:

```bash
# run docker container in development mode
docker-compose up
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Postman

Use Postman collection to view RESTFul endpoints

## GraphQL

While running the application, open `${Application_Base_Url}/graphql` to view queries and mutations
