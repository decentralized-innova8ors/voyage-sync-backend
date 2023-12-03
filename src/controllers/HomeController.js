import asyncHandler from 'express-async-handler';

class HomeController {
  static getHome = asyncHandler(async (req, res) => {
    res.status(200).json({
      message: 'Welcome to the Voyage Sync'
    })
  })
}

export default HomeController;
