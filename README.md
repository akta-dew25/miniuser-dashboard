# Mini User Dashboard

A dashboard application with separate frontend and backend that can be hosted independently.

## Architecture

- **Frontend**: React application built with Vite
- **Backend**: Express.js API server

Both can be hosted on separate servers/domains with minimal configuration changes.

## Prerequisites

- **nvm** (Node Version Manager) - Required for managing Node.js versions. [Installation instructions](https://github.com/nvm-sh/nvm)

## Setup

**Before installation, make sure to run:**
```bash
nvm use
```

This ensures you're using the correct Node.js version for this project.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment example file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
   - `PORT`: Server port (default: 3001)
   - `NODE_ENV`: Set to `production` for production deployment

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment example file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
   - `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:3001)

5. Start the development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
```

## Development

- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:3001`
- In development, the Vite proxy automatically forwards `/api` requests to the backend

## Environment Variables Reference

### Frontend (.env)
- `VITE_API_BASE_URL`: Backend API base URL (must start with `VITE_` to be exposed to client)

### Backend (.env)
- `PORT`: Server port number
- `NODE_ENV`: `development` or `production`
