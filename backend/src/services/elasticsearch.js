const { Client } = require('@elastic/elasticsearch');

class ElasticsearchService {
  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
      // Add authentication if needed
      auth: {
        username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
        password: process.env.ELASTICSEARCH_PASSWORD || 'XEcEhNGa8rKGxzuQWiEg'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    this.indexName = process.env.ELASTICSEARCH_INDEX || 'books';
  }

  async createIndex() {
    try {
      const indexExists = await this.client.indices.exists({
        index: this.indexName
      });

      if (indexExists) {
        console.log(`Index ${this.indexName} already exists`);
        return true;
      }

      const indexConfig = {
        index: this.indexName,
        body: {
          settings: {
            number_of_shards: 1,
            number_of_replicas: 0,
          },
          mappings: {
            properties: {
              title: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword'
                  },
                }
              },
              author: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword'
                  },
                }
              },
              category: {
                type: 'keyword'
              },
              published_date: {
                type: 'date',
                format: 'yyyy-MM-dd||yyyy'
              },
              description: {
                type: 'text',
                analyzer: 'standard'
              },
              isbn: {
                type: 'keyword'
              },
              pages: {
                type: 'integer'
              },
              rating: {
                type: 'float'
              }
            }
          }
        }
      };

      await this.client.indices.create(indexConfig);
      console.log(`Index ${this.indexName} created successfully`);
      return true;
    } catch (error) {
      console.error('Failed to create index:', error);
      throw error;
    }
  }

  async indexDocument(document) {
    try {
      const response = await this.client.index({
        index: this.indexName,
        body: document
      });
      return response;
    } catch (error) {
      console.error('Failed to index document:', error);
      throw error;
    }
  }

  async bulkIndex(documents) {
    try {
      const body = documents.flatMap(doc => [
        { index: { _index: this.indexName } },
        doc
      ]);

      const response = await this.client.bulk({
        refresh: true,
        body
      });
      return response;
    } catch (error) {
      console.error('Failed to bulk index documents:', error);
      throw error;
    }
  }

  async search(searchParams) {
    try {
      const {
        query = '',
        category = '',
        author = '',
        page = 1,
        size = 10,
      } = searchParams;

      const from = (page - 1) * size;
      const mustQueries = [];
      const shouldQueries = [];
      if (query) {
        shouldQueries.push(
          // Exact title match (highest priority)
          {
            match_phrase: {
              'title.keyword': {
                query: query,
                boost: 10
              }
            }
          },
          // Title fuzzy match
          {
            fuzzy: {
              title: {
                value: query,
                fuzziness: 'AUTO',
                boost: 8
              }
            }
          },
          // Author exact match
          {
            match_phrase: {
              'author.keyword': {
                query: query,
                boost: 9
              }
            }
          },
          // Author fuzzy match
          {
            fuzzy: {
              author: {
                value: query,
                fuzziness: 'AUTO',
                boost: 7
              }
            }
          },
          // Multi-field search
          {
            multi_match: {
              query: query,
              fields: ['title^3', 'author^2', 'description'],
              type: 'best_fields',
              fuzziness: 'AUTO',
              boost: 4
            }
          }
        );
      }

      // Category filter
      if (category) {
        mustQueries.push({
          term: {
            category: category
          }
        });
      }

      // Author filter (when specified as a filter, not search)
      if (author && !query.toLowerCase().includes(author.toLowerCase())) {
        mustQueries.push({
          match: {
            author: author
          }
        });
      }

      const searchQuery = {
        index: this.indexName,
        body: {
          from,
          size,
          query: {
            bool: {
              must: mustQueries,
              should: shouldQueries.length > 0 ? shouldQueries : undefined,
              minimum_should_match: shouldQueries.length > 0 ? 1 : undefined
            }
          },
          aggs: {
            authors: {
              terms: {
                field: 'author.keyword',
                size: 20
              }
            },
            categories: {
              terms: {
                field: 'category',
                size: 10
              }
            },
            years: {
              date_histogram: {
                field: 'published_date',
                calendar_interval: 'year',
                format: 'yyyy',
                order: { _key: 'desc' }
              }
            }
          },
          highlight: {
            fields: {
              title: {},
              author: {},
              description: {}
            }
          }
        }
      };

      // If no search criteria, match all
      if (mustQueries.length === 0 && shouldQueries.length === 0) {
        searchQuery.body.query = { match_all: {} };
      }

      const response = await this.client.search(searchQuery);
      
      // Handle different response structure in newer ES versions
      const responseBody = response.body || response;
      
      return {
        hits: responseBody.hits.hits.map(hit => ({
          id: hit._id,
          score: hit._score,
          ...hit._source,
          highlights: hit.highlight
        })),
        total: responseBody.hits.total.value || responseBody.hits.total,
        aggregations: {
          authors: responseBody.aggregations.authors.buckets,
          categories: responseBody.aggregations.categories.buckets,
          years: responseBody.aggregations.years.buckets
        },
        page,
        totalPages: Math.ceil((responseBody.hits.total.value || responseBody.hits.total) / size)
      };
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  }

  async deleteIndex() {
    try {
      const indexExists = await this.client.indices.exists({
        index: this.indexName
      });

      if (indexExists) {
        await this.client.indices.delete({
          index: this.indexName
        });
        console.log(`Index ${this.indexName} deleted`);
      }
    } catch (error) {
      console.error('Failed to delete index:', error);
      throw error;
    }
  }
}

module.exports = new ElasticsearchService();