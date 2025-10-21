# Book Search Application

A full-stack Book Search Application built with Node.js, Elasticsearch, and React.js that allows users to search for books by title, author, and category with advanced features like fuzzy matching, phonetic search, and aggregations.

## Features

### Backend Features
- **Express.js API** with RESTful endpoints
- **Elasticsearch Integration** with advanced querying
- **Fuzzy Search** for handling typos
- **Phonetic Search** for better matching
- **Aggregations** by author and publication year
- **Pagination** for search results
- **Autocomplete** suggestions
- **Rate Limiting** and security headers

### Frontend Features
- **React.js** with modern hooks
- **Material-UI** for clean interface
- **Real-time Search** as you type
- **Category Filtering**
- **Loading States** and error handling
- **Responsive Design**

## Technology Stack

- **Backend**: Node.js, Express.js, Elasticsearch
- **Frontend**: React.js, Material-UI, Axios
- **Search Engine**: Elasticsearch 8.x
- **Development**: Nodemon, Create React App

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

## API Endpoints

### Search Books
```
POST /api/search
```

**Request Body:**
```json
{
  "query": "javascript",
  "category": "Programming",
  "author": "John Doe",
  "page": 1,
  "size": 10
}
```

**Response:**
```json
{
  "hits": [...],
  "total": 25,
  "aggregations": {
    "authors": [...],
    "years": [...]
  },
  "page": 1,
  "totalPages": 3
}
```

### Autocomplete
```
GET /api/autocomplete?q=javascr
```

## Elasticsearch Setup Details

### Index Mapping
The application creates an index with the following mapping:

```json
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "fields": {
          "keyword": {"type": "keyword"},
          "phonetic": {"type": "text", "analyzer": "phonetic_analyzer"}
        }
      },
      "author": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "fields": {
          "keyword": {"type": "keyword"},
          "phonetic": {"type": "text", "analyzer": "phonetic_analyzer"}
        }
      },
      "category": {"type": "keyword"},
      "published_date": {"type": "date"}
    }
  }
}
```

### Custom Analyzers
- **Fuzzy Search**: Handles typos and misspellings
- **Phonetic Search**: Matches words that sound similar
- **Custom Tokenization**: Optimized for book titles and author names

## Project Structure

```
Book-Search/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   ├── scripts/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── utils/
└── README.md
```

## Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run setup-elasticsearch` - Create index and mappings
- `npm run seed-data` - Populate with sample data

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Troubleshooting

### Elasticsearch Connection Issues
1. Verify Elasticsearch is running: `curl http://localhost:9200`
2. Check the connection URL in `.env` file
3. Ensure no firewall is blocking port 9200

### CORS Issues
- The backend is configured to allow requests from `http://localhost:3000`
- Update CORS settings in `server.js` if using different ports

### Search Not Working
1. Verify the index exists: `curl http://localhost:9200/books`
2. Check if data is indexed: `curl http://localhost:9200/books/_count`
3. Review backend logs for errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Elasticsearch documentation
3. Open an issue on GitHub