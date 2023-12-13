import express from 'express';
import HomeController from '../controllers/HomeController.js';
import HotelController from '../controllers/HotelController.js';
import AirportController from '../controllers/AirportController.js';
import PlaceController from '../controllers/PlaceController.js';

const router = express.Router();

// home routes
router.get('/', HomeController.getHome);

// Hotel routes
router.get('/hotels', HotelController.getHotels);

// Airport routes
router.get('/airports', AirportController.getAllAirports);

// places routes
router.get('/cities', PlaceController.getAllCities);
router.get('/countries', PlaceController.getAllCountries);


export default router;
