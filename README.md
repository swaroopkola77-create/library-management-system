# Library Management System Backend

A clean, modular REST API for managing library books.

## Tech Stack

- Node.js 24
- Express 5
- MongoDB
- Mongoose
- Helmet
- CORS
- express-rate-limit

## Project Structure

```text
library-management-system/
├── controllers/
│   └── bookController.js
├── models/
│   └── Book.js
├── routes/
│   └── bookRoutes.js
├── .env.example
├── .gitignore
├── .vercelignore
├── package.json
├── README.md
├── server.js
└── vercel.json
```

## Features

- Create, read, update and delete books
- Search by title, author or ISBN
- Filter by availability
- Pagination
- ISBN uniqueness protection
- Mongoose validation
- MongoDB ObjectId validation
- Centralized error handling
- Security headers with Helmet
- Configurable CORS
- API rate limiting
- Health-check endpoint
- Vercel deployment configuration
- Environment-variable based configuration

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | Check API and database status |
| GET | `/api/books` | List books |
| POST | `/api/books` | Create a book |
| GET | `/api/books/:id` | Get one book |
| PATCH | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |
| PATCH | `/api/books/:id/availability` | Update availability |

## Query Parameters

Example:

```text
GET /api/books?page=1&limit=20&search=atomic&available=true
```

- `page` — page number.
- `limit` — results per page, maximum 100.
- `search` — searches title, author and ISBN.
- `available` — `true` or `false`.

## Create a Book

### Request

```http
POST /api/books
Content-Type: application/json
```

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "isbn": "9780735211292",
  "category": "Self Help",
  "publishedYear": 2018,
  "available": true
}
```

## Environment Variables

Create a `.env` file using `.env.example` as the template.

```env
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
PORT=5000
```

Never commit a real `.env` file or database credentials.

## Run Locally

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Start normally

```bash
npm start
```

The local API normally runs at `http://localhost:5000`.

## Deploy to Vercel

This repository includes `vercel.json` for Vercel deployment.

1. Import the GitHub repository into Vercel.
2. Add `MONGODB_URI` under Environment Variables.
3. Add `CORS_ORIGIN` with your frontend URL.
4. Deploy.

Do not put database credentials directly in source files.

## Architecture

```text
HTTP Request
     |
     v
   Route
     |
     v
 Controller
     |
     v
Mongoose Model
     |
     v
  MongoDB
```

### Routes

Define API endpoints and lightweight request validation.

### Controllers

Contain the application logic for creating, reading, updating and deleting books.

### Models

Define MongoDB fields, validation rules and indexes.

### server.js

Configures Express middleware, the database connection, routes, health checks and error handling.

## Production Notes

- Restrict `CORS_ORIGIN` to the real frontend domain.
- Keep secrets in deployment environment variables.
- Use a managed MongoDB deployment for production.
- Add authentication and authorization before exposing administrative operations.
- Add automated tests before making frequent production changes.
- Keep the API stateless for serverless deployment.

## License

Educational and application-development project.
