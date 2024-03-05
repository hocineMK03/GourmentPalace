const services = require('../services/ratingServices');

class RatingControllers {
  async assignRating(req, res) {
    const { recipe_id, rating } = req.body;
    const sessiontoken = req.headers['sessiontoken']; // Assuming 'sessiontoken' is the header name
    console.log("bere",sessiontoken)
    try {
      const result = await services.assignRatingService(recipe_id, rating, sessiontoken);

      if (result) {
        return res.status(200).json('success');
      }

      return res.status(400).json('cant');
    } catch (error) {
      console.error('Error in assignRating:', error.message);
      return res.status(500).json('internal error');
    }
  }
}

module.exports = new RatingControllers();
