# E-commerce Product Catalog

This project is a simple e-commerce product catalog application with a React frontend and an Express.js backend.

Demo Link : https://www.loom.com/share/3f505ca09a774206af5990a806c816f0

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Project Structure

The project is set up as a monorepo with two main packages:

- `frontend`: React frontend
- `backend`: Express.js backend

## Running with Docker

This project can also be run using Docker. Make sure you have Docker and Docker Compose installed on your system.

1. Clone the repository:

   ```
   git clone [<repository-url>](https://github.com/RikasMRM/e-com-product-catalog.git)
   ```

2. Build and run the Docker containers:

   ```
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:3000

To stop the containers, press Ctrl+C in the terminal where docker-compose is running, or run:

```
docker-compose down
```

## Setup and Installation

1. Clone the repository:

   ```
   git clone [<repository-url>](https://github.com/RikasMRM/e-com-product-catalog.git)
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up the backend:

   ```
   cd backend
   npm install
   ```

4. Set up the frontend:
   ```
   cd frontend
   npm install
   ```

## Running the Application

1. Start the backend server:

   ```
   cd backend
   npm run dev
   ```

   The server will start on `http://localhost:3000`.

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Features

- View a list of products
- Search for products
- View detailed product information
- Create new products
- Responsive design

## Assumptions

1. The backend uses an in-memory SQLite database, which resets on server restart.
2. The frontend uses Vite as the build tool and development server.
3. Authentication and user management are not implemented in this version.
4. The application assumes a stable internet connection for API requests.
5. The product images are not handled in this version; only textual data is managed.
6. The application is designed for modern browsers and may not support older versions.

## Technologies Used

- Frontend:

  - React
  - TypeScript
  - Tailwind CSS
  - React Query (TanStack Query)
  - React Router

- Backend:
  - Express.js
  - TypeScript
  - Drizzle ORM
  - SQLite (in-memory)

## Project Screenshot

![Project Screenshot](images/Frame.png)
