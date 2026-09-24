# Library Management System Backend

Production-oriented Express + MongoDB API using the requested structure.

## Endpoints
GET /health
GET /api/books
POST /api/books
GET /api/books/:id
PATCH /api/books/:id
DELETE /api/books/:id
PATCH /api/books/:id/availability

## Local
cp .env.example .env
npm install
npm start

## Vercel
Configure MONGODB_URI and CORS_ORIGIN in Vercel Environment Variables. Do not commit .env.
