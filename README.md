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
```
GET /api/v1                     # Check api health
GET /api/v1/auth                # Get the authorization token for later requests

# Need Authenticated Header

GET /api/v1/estado              # Get all the data from {estado}
POST /api/v1/estado             # Add new entry for {estado}
GET /api/v1/estado/:id          # Get a specific entry from {estado}
PUT /api/v1/estado/:id          # Update a specific entry from {estado}
DELETE /api/v1/estado/:id       # Delete a specific entry from {estado}
GET /api/v1/cidade              # Get all the data from {cidade}
POST /api/v1/cidade             # Add new entry for {cidade}
GET /api/v1/cidade/:id          # Get a specific entry from {cidade}
PUT /api/v1/cidade/:id          # Update a specific entry from {cidade}
DELETE /api/v1/cidade/:id       # Delete a specific entry from {cidade}
```

> Made by: [@joaomarcuslf](http://joaomarcuslf.github.io/)
