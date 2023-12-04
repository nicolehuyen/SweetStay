const express = require('express');
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("City is required"),
    check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("State is required"),
    check('country')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Country is required"),
    check('lat')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude is not valid"),
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Description is required"),
    check('price')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isFloat({ min: 1 })
      .withMessage("Price per day is required"),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isFloat({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    let spots = await Spot.findAll({
        where: { ownerId: user.id }
    })
    let arr = [];

    for(let i = 0; i < spots.length; i++) {
        let spot = spots[i]

        const numReviews = await Review.count({
            where: { spotId: spot.id }
        })

        const sumRating = await Review.sum('stars', {
            where: { spotId: spot.id }
        })

        const avgRating = sumRating / numReviews;

        const previewImage = await SpotImage.findOne({
            attributes: ['url'],
            where: { spotId: spot.id, preview: true }
        })

        spot = spot.toJSON()
        spot.avgRating = avgRating ? avgRating : ''
        spot.previewImage = previewImage ? previewImage.url : ''

        arr.push(spot)
    }

    return res.json({ Spots: arr })
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId)

    if(!spot) {
        return res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    if(user.id !== spot.ownerId) {
        const bookings = await Booking.findAll({
            where: { spotId: spotId },
            attributes: ['spotId', 'startDate', 'endDate']
        })

        return res.json({ Bookings: bookings })
    } else {
        const bookings = await Booking.findAll({
            where: { spotId: spotId },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })

        return res.json({ Bookings: bookings })
    }
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { user } = req;
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId)

    if(!spot) {
        return res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    let startDateString = new Date(startDate).toDateString()
    let endDateString = new Date(endDate).toDateString()

    let startDateTime = new Date(startDateString).getTime()
    let endDateTime = new Date(endDateString).getTime()

    if(startDateTime >= endDateTime) {
        return res.status(400).json({
            message: 'Bad Request',
            errors: {
                endDate: 'endDate cannot be on or before startDate'
            }
        })
    }

    const bookings = await Booking.findAll({
        where: { spotId: spotId }
    })

    let errors = {}

    for(let booking of bookings) {
        let newStartDate = new Date(booking.startDate).toDateString()
        let newEndDate = new Date(booking.endDate).toDateString()

        newStartDate = new Date(newStartDate).getTime()
        newEndDate = new Date(newEndDate).getTime()

        if(endDateTime >= newStartDate && endDateTime <= newEndDate) {
            errors.endDate = "End date conflicts with an existing booking"
        }

        if(startDateTime >= newStartDate && startDateTime <= newEndDate) {
            errors.startDate = "Start date conflicts with an existing booking"
        }

        if(startDateTime < newStartDate && endDateTime > newEndDate) {
            errors.startDate = "Start date conflicts with an existing booking"
            errors.endDate = "End date conflicts with an existing booking"
        }

        if(Object.keys(errors).length) {
            const err = {
                message: "Sorry, this spot is already booked for the specified dates",
                errors: errors
            }

            return res.status(403).json(err)
        }
    }

    if(user.id !== spot.ownerId) {
        const newBooking = await Booking.create({
            spotId,
            userId: user.id,
            startDate,
            endDate
        })

        return res.json(newBooking)
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId)

    if(!spot) {
        return res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    const reviews = await Review.findAll({
        where: { spotId: spotId }
    })
    let arr = [];

    for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i]

        const user = await User.findOne({
            attributes: ['id', 'firstName', 'lastName'],
            where: { id: spotId }
        })

        const reviewImage = await ReviewImage.findAll({
            attributes: ['id', 'url'],
            where: { reviewId: spotId }
        })

        review = review.toJSON()
        review.User = user;
        review.ReviewImages = reviewImage;

        arr.push(review)
    }

    return res.json({ Reviews: arr })
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body;
    const { user } = req;
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId);
    const reviewSubmitted = await Review.findOne({
        where: { userId: user.id, spotId}
    })

    if(!spot) {
        return res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    if(reviewSubmitted) {
        return res.status(500).json({
            message: "User already has a review for this spot"
        })
    }

    const newReview = await Review.create({
        userId: user.id,
        spotId: spot.id,
        review,
        stars
    })

    return res.status(201).json(newReview)
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const { user } = req;
    let spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        return res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    if(user.id === spot.ownerId) {
        const image = await spot.createSpotImage({
            url,
            preview
        })

        return res.json({
            id: image.id,
            url,
            preview
        })
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId)

    if(!spot) {
        return res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    const spotImage = await SpotImage.findAll({
        attributes: ['id', 'url', 'preview'],
        where: { spotId, preview: true }
    })

    const owner = await User.findOne({
        attributes: ['id', 'firstName', 'lastName'],
        where: { id: spot.ownerId }
    })

    const numReviews = await Review.count({
        where: { spotId }
    })

    const sumRating = await Review.sum('stars', {
        where: { spotId }
    })

    const avgRating = sumRating / numReviews;

    spot = spot.toJSON()
    spot.numReviews = numReviews;
    spot.avgRating = avgRating ? avgRating : ''
    spot.SpotImages = spotImage;
    spot.Owner = owner;

    return res.json(spot)
})

// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;
    let spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        return res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    if(user.id === spot.ownerId) {
        spot.address = address || spot.address;
        spot.city = city || spot.city;
        spot.state = state || spot.state;
        spot.country = country || spot.country;
        spot.lat = lat || spot.lat;
        spot.lng = lng || spot.lng;
        spot.name = name || spot.name;
        spot.description = description || spot.description;
        spot.price = price || spot.price;

        await spot.save();

        return res.json(spot)
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { user } = req;
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        return res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    if(user.id === spot.ownerId) {
        await spot.destroy();

        return res.json({
            "message": "Successfully deleted"
        })
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Get all Spots
router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const errors = {};

    page = parseInt(page);
    size = parseInt(size);

    if(page < 1) errors.page = "Page must be greater than or equal to 1"
    if(size < 1) errors.size = "Size must be greater than or equal to 1"

    if(minLat) {
        if(minLat < -90 || minLat > 90) errors.minLat = "Minimum latitude is invalid"
    }

    if(maxLat) {
        if(maxLat < -90 || maxLat > 90) errors.maxLat = "Maximum latitude is invalid"
    }

    if(minLng) {
        if(minLng < -180 || minLng > 180) errors.minLng = "Minimum longitude is invalid"
    }

    if(maxLng) {
        if(maxLng < -180 || maxLng > 180) errors.maxLng = "Maximum longitude is invalid"
    }

    if(minPrice) {
        if(minPrice < 0) errors.minPrice = "Minimum price must be greater or equal to 0"
    }

    if(maxPrice) {
        if(maxPrice < 0) errors.maxPrice = "Minimum price must be greater or equal to 0"
    }

    if(Object.keys(errors).length) {
        const err = new Error()
        err.message = "Bad Request"
        err.errors = errors
        return res.status(400).json(err)
    }

    if(Number.isNaN(page) || page <= 0 || !page) page = 1;
    if(Number.isNaN(size) || size <= 0 || !size) size = 20;

    if(page > 10) page = 10;
    if(size > 20) size = 20;

    const where = {};

    if(minLat && !maxLat) where.lat = {[Op.gte]: minLat}
    if(maxLat && !minLat) where.lat = {[Op.lte]: maxLat}
    if(minLat && maxLat) where.lat = {[Op.between]: [minLat, maxLat]}

    if(minLng && !maxLng) where.lng = {[Op.gte]: minLng}
    if(maxLng && !minLng) where.lng = {[Op.lte]: maxLng}
    if(minLng && maxLng) where.lng = {[Op.between]: [minLng, maxLng]}

    if(minPrice && !maxPrice) where.minPrice = minPrice
    if(maxPrice && !minPrice) where.maxPrice = maxPrice
    if(minPrice && maxPrice) where.price = {[Op.between]: [minPrice, maxPrice]}

    const spots = await Spot.findAll({
        where,
        limit: size,
        offset: size * (page - 1)
    })

    let arr = []

    for (let i = 0; i < spots.length; i++) {
        let spot = spots[i]

        const numReviews = await Review.count({
            where: { spotId: spot.id }
        })

        const sumRating = await Review.sum('stars', {
            where: { spotId: spot.id }
        })

        const avgRating = sumRating / numReviews;

        const previewImage = await SpotImage.findOne({
            attributes: ['url'],
            where: { spotId: spot.id, preview: true }
        })

        spot = spot.toJSON();
        spot.avgRating = avgRating ? avgRating : ''
        spot.previewImage = previewImage ? previewImage.url : ''

        arr.push(spot);
    }

    return res.json({ Spots: arr, page, size })
});

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;

    const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.status(201).json(newSpot)
})

module.exports = router;
