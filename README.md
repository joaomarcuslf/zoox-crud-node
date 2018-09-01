# ZOOX-CRUD-NODE

## Getting Started

```sh
  # Starting the project
  $ yarn start:prod
```

```sh
  # Developing the project
  $ yarn start:dev
```

```sh
  # Testing the project
  $ yarn test:all
```

## Routes - Basic Documentations
```sh
GET      /v1                # Check api health
GET      /v1/auth           # Get the authorization token for later requests

# Need Authenticated Header

GET      /v1/estados         # Get all the data from {estado}
POST     /v1/estados         # Add new entry for {estado}
GET      /v1/estados/search  # Fetch entities from {estado} with query
GET      /v1/estados/:id     # Get a specific entry from {estado}
PUT      /v1/estados/:id     # Update a specific entry from {estado}
DELETE   /v1/estados/:id     # Delete a specific entry from {estado}
GET      /v1/cidades         # Get all the data from {cidade}
POST     /v1/cidades         # Add new entry for {cidade}
GET      /v1/cidades/search  # Fetch entities from {cidade} with query
GET      /v1/cidades/:id     # Get a specific entry from {cidade}
PUT      /v1/cidades/:id     # Update a specific entry from {cidade}
DELETE   /v1/cidades/:id     # Delete a specific entry from {cidade}
```

> Made by: [@joaomarcuslf](http://joaomarcuslf.github.io/)
