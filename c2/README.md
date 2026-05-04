# ExpressJS CRUD Service (TypeScript)

This project is a simple backend service built with ExpressJS and TypeScript.  
It provides CRUD interfaces for a `resource` entity and uses Prisma ORM with SQLite for data persistence.

## Features

- Create a resource
- List resources with basic filters
- Get details of a resource
- Update a resource
- Delete a resource
- Persistent storage in `data/db.json`

## Tech Stack

- Node.js
- ExpressJS
- TypeScript
- class-validator + class-transformer
- Prisma ORM
- SQLite

## Architecture (Separation of Concerns)

The codebase is organized in layers:

- `src/routes`: HTTP route definitions
- `src/controllers`: Handles request/response mapping
- `src/services`: Business logic
- `src/repositories`: Data-access layer for persistence
- `src/middleware`: Validation and error handling middleware
- `src/dto`: Request DTOs validated with `class-validator`
- `src/errors`: Shared application error classes

## Project Setup

1. Open terminal in `c2` folder.
2. Install dependencies:

```bash
npm install
```
3. Generate Prisma client:

```bash
npm run prisma:generate
```

4. Run database migration:

```bash
npm run prisma:migrate -- --name init
```

## Run Application

### Development mode

```bash
npm run dev
```

Starts server at:

`http://localhost:3000`

Swagger UI:

`http://localhost:3000/docs`

### Production mode

```bash
npm run build
npm start
```

## API Endpoints

Base URL: `http://localhost:3000`

OpenAPI JSON: `GET /openapi.json`

### Health Check

- `GET /health`

Response:

```json
{ "status": "ok" }
```

### 1) Create Resource

- `POST /resources`

Request body:

```json
{
  "name": "My Resource",
  "description": "Optional description",
  "status": "active"
}
```

Notes:
- `name` is required
- `status` is optional (`active` or `inactive`), default is `active`

### 2) List Resources (with filters)

- `GET /resources`

Optional query params:
- `status`: `active` or `inactive`
- `searchTerm`: search in both `name` and `description`

Example:

```http
GET /resources?status=active&searchTerm=demo
```

### 3) Get Resource Details

- `GET /resources/:id`

### 4) Update Resource

- `PUT /resources/:id`

Request body (any subset of fields):

```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "status": "inactive"
}
```

### 5) Delete Resource

- `DELETE /resources/:id`

Response: HTTP `204 No Content` on success.

## Resource Model

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "status": "active | inactive",
  "createdAt": "ISO date string",
  "updatedAt": "ISO date string"
}
```

## Data Persistence

- SQLite database file is stored at: `prisma/dev.db`
- Data remains available across server restarts
