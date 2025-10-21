require('dotenv').config();
const elasticsearchService = require('../src/services/elasticsearch');

async function setupElasticsearch() {
  try {
    await elasticsearchService.deleteIndex();
    await elasticsearchService.createIndex(); 
  } catch (error) {
    console.error('Elasticsearch setup failed:', error.message);
    process.exit(1);
  }
}

setupElasticsearch();