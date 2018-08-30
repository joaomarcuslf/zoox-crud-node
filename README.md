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

# Need x-api-key

GET /api/v1/estado              # Get all the data from {estado}
POST /api/v1/estado             # Add new entry for {estado}
GET /api/v1/estado/:estadoId    # Get a specific entry from {estado}
PUT /api/v1/estado/:estadoId    # Update a specific entry from {estado}
DELETE /api/v1/estado/:estadoId # Delete a specific entry from {estado}
```

> Made by: [@joaomarcuslf](http://joaomarcuslf.github.io/)
