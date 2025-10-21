const elasticsearchService = require('../services/elasticsearch');

class SearchController {
  
  async searchBooks(req, res) {
    try {
      const {
        query = '',
        category = '',
        author = '',
        page = 1,
        size = 10,
      } = req.body;

      // pagination
      const pageNum = Math.max(1, parseInt(page));
      const sizeNum = Math.min(100, Math.max(1, parseInt(size))); // Limit max size to 100

      // search
      const searchResults = await elasticsearchService.search({
        query: query.trim(),
        category: category.trim(),
        author: author.trim(),
        page: pageNum,
        size: sizeNum
      });

      const response = {
        ...searchResults,
        searchParams: {
          query,
          category,
          author,
          page: pageNum,
          size: sizeNum
        },
        timestamp: new Date().toISOString()
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({
        message: 'An error occurred while searching. Please try again.',
        error:error
      });
    }
  }
}

module.exports = new SearchController();