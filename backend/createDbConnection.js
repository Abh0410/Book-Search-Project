require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');

async function connectionDb(){
  
  const client = new Client({
    node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    auth: {
      username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
      password: process.env.ELASTICSEARCH_PASSWORD || 'XEcEhNGa8rKGxzuQWiEg'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  console.log("Esclient created.")
}

connectionDb();