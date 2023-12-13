import axios from 'axios';
import asyncHandler from 'express-async-handler';

class PlaceController {
  static getAllCities = asyncHandler(async (req, res) => {
    const apiKey = process.env.AVIATIONSTACK_API_KEY;
    const { search } = req.query;

    if (!apiKey) {
      return res.status(400).json({
        error: 'API access key is required.'
      });
    }

    try {
      const apiUrl = 'http://api.aviationstack.com/v1/cities';
      let cities = [];
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

        cities = cities.concat(response.data.data);
        totalResults = response.data.pagination.total;
        page++;
      } while (cities.length < totalResults);

      if (search) {
        const searchTerm = search.toLowerCase();
        cities = cities.filter((city) =>
          city.city_name.toLowerCase().includes(searchTerm)
        );
      }

      res.status(200).json({
        cities,
        pagination: {
          total_pages: Math.ceil(totalResults / 100),
          limit: 100,
          offset: (page - 1) * 100,
          count: cities.length,
          total: totalResults,
        },
      });
    } catch (error) {
      console.error('Error fetching cities:', error.message);
      console.error('Error details:', error.response ? error.response.data : '');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  static getAllCountries = asyncHandler(async (req, res) => {
    const apiKey = process.env.AVIATIONSTACK_API_KEY;
    const { search } = req.query;

    if (!apiKey) {
      return res.status(400).json({
        error: 'API access key is required.'
      });
    }

    try {
      const apiUrl = 'http://api.aviationstack.com/v1/countries';
      let countries = [];
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

        countries = countries.concat(response.data.data);
        totalResults = response.data.pagination.total;
        page++;
      } while (countries.length < totalResults);

      if (search) {
        const searchTerm = search.toLowerCase();
        countries = countries.filter((country) =>
          country.country_name.toLowerCase().includes(searchTerm)
        );
      }

      res.status(200).json({
        countries,
        pagination: {
          total_pages: Math.ceil(totalResults / 100),
          limit: 100,
          offset: (page - 1) * 100,
          count: countries.length,
          total: totalResults,
        },
      });
    } catch (error) {
      console.error('Error fetching countries:', error.message);
      console.error('Error details:', error.response ? error.response.data : '');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
}

export default PlaceController;
