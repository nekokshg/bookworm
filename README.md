# bookclub
backend/
    config/ <= Configuration files (e.g., database, server settings)
    controllers/ <= Functions for handling API requests
    models/ <= Mongoose models (e.g., User, Book, Review)
    routes/ <= Express routes for APIs (internal routes, Open Library routes)
    middlewares/ <= Middleware for authentication, error handling
    services/ <= For interacting with external APIs (e.g., Open Library)
    utils/ <= Utility functions (e.g., token generation, password hashing)
    .env <= Environment variables (e.g., Mongo URI)
    server.js <= Main server file (this will handle both internal and external APIs)
