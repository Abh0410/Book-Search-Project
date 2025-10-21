# Book Search Application

A full-stack Book Search Application built with Node.js, Elasticsearch, and React.js that allows users to search for books by title, author and category.

## Features

### Backend Features
- Express.js API with RESTful endpoints
- Elasticsearch as DB
- Allows user to search books by title author and category

### Frontend Features
- React.js 
- Material-UI for clean interface
- Real-time Search as you type.

## Technology Stack

- Backend: Node.js, Express.js, Elasticsearch
- Frontend: React.js, Material-UI, Axios
- Search Engine: Elasticsearch 8.x
- Development: Nodemon, Create React App

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **Elasticsearch** (v8.x) - Choose one of the following:
   - **Local Installation**: [Download here](https://www.elastic.co/downloads/elasticsearch)
   - **Docker**: `docker run -d -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.11.0`
   - **Elastic Cloud**: [Sign up here](https://cloud.elastic.co/)

## Quick Start

### 1. Clone and Install Dependencies

```bash
# Navigate to the project directory
cd Book-Search

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start Elasticsearch

Choose one of the following methods:

**Option A: Docker (Recommended)**
```bash
docker run -d -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.11.0
```

**Option B: Local Installation**
- Start Elasticsearch service on your system
- Ensure it's running on `http://localhost:9200`

### 3. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Setup Elasticsearch index and mappings
npm run setup-elasticsearch

# Seed sample data
npm run seed-data

# Start the backend server
npm run dev
```

The backend will be running on `http://localhost:3001`

### 4. Start Frontend

```bash
# Navigate to frontend directory (new terminal)
cd frontend

# Start the React development server
npm start
```

The frontend will be running on `http://localhost:3000`



### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run setup-elasticsearch` - Create index and mappings
- `npm run seed-data` - Populate with sample data

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

