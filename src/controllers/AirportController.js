import axios from 'axios';
import asyncHandler from 'express-async-handler';

class AirportController {
  static getAllAirports = asyncHandler(async (req, res) => {
    const apiKey = process.env.AVIATIONSTACK_API_KEY;
    const { search } = req.query;

    if (!apiKey) {
      return res.status(400).json({
        error: 'API access key is required.'
      });
    }

    try {
      const apiUrl = 'http://api.aviationstack.com/v1/airports';
      let airports = [];
      let page = 1;
      let totalResults = 0;

      // Loop through all pages
      do {
        const response = await axios.get(apiUrl, {
          params: {
            access_key: apiKey,
            limit: 100,
            offset: (page - 1) * 100,
          },
        });

        airports = airports.concat(response.data.data);
        totalResults = response.data.pagination.total;
        page++;
      } while (airports.length < totalResults);

      if (search) {
        const searchTerm = search.toLowerCase();
        airports = airports.filter((airport) =>
          airport.airport_name.toLowerCase().includes(searchTerm)
        );
      }

      res.status(200).json({
        airports,
        pagination: {
          total_pages: Math.ceil(totalResults / 100),
          limit: 100,
          offset: (page - 1) * 100,
          count: airports.length,
          total: totalResults,
        },
      });
    } catch (error) {
      console.error('Error fetching airports:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}

export default AirportController;
