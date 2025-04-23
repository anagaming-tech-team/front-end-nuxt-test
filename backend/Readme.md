# Running the API with Docker and Docker Compose

This guide explains how to build and run the Node.js/Express API (with integrated Swagger docs) using Docker and Docker Compose.

## Prerequisites

- Docker installed on your machine
- Docker Compose installed (v1.27+)

## 1. Create a `.env` file

In the project root, add a file named `.env` with:

```
PORT=3333
MONGO_URI=mongodb://db:27017/desafio
JWT_SECRET=algum_segredo_super_forte
```

This value will be injected into the container as the signing secret for your JWTs.

## 2. Review `docker-compose.yml`

Ensure your `docker-compose.yml` includes two services:

- **api**

  - Builds your application image (Dockerfile in the root)
  - Exposes port `3333` → `3333`
  - Defines `MONGO_URI=mongodb://db:27017/desafio` and `JWT_SECRET=${JWT_SECRET}`
  - Depends on `db`

- **db**
  - Uses `mongo:6` image
  - Exposes port `27017` → `27017`
  - Runs with `command: ["mongod", "--bind_ip_all"]` for open access

Example snippet:

```yaml
services:
  api:
    build: .
    ports:
      - "3333:3333"
    environment:
      - MONGO_URI=mongodb://db:27017/desafio
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db

  db:
    image: mongo:6
    ports:
      - "27017:27017"
    command: ["mongod", "--bind_ip_all"]
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

## 3. Build and run

From the project root, run:

```bash
docker-compose up --build -d
```

- `--build` ensures the API image is rebuilt with your latest code.
- `-d` runs containers in the background.

Verify everything is up:

```bash
docker-compose ps
```

## 4. Verify the API

The application base URL is:

```
http://localhost:3333/api
```

Try:

```
GET http://localhost:3333/api/users
```

(with a valid JWT) to fetch all users.

## Accessing the API Documentation

Open your browser and navigate to:

```markdown
## Swagger UI

[http://localhost:3333/api/docs](http://localhost:3333/api/docs)
```

You will see the interactive Swagger interface, with endpoints, request/response schemas, and "Authorize" button for your JWT.

## 5. Shut down

When you’re done, stop and remove containers with:

```bash
docker-compose down
```
