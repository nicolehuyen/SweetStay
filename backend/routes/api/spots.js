const express = require('express');

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
    const { id } = req.user;
    // let spots = await Spot.findAll({
    //     where: { ownerId: id }
    // })
    let spots = await Spot.findByPk(id)

    const numReviews = await Review.count({
        where: { spotId: id }
    })

    const sumRating = await Review.sum('stars', {
        where: { spotId: id }
    })

    const avgRating = sumRating / numReviews;

    const previewImage = await SpotImage.findOne({
        attributes: ['url'],
        where: { spotId: id, preview: true }
    })

    spots = spots.toJSON()
    spots.avgRating = avgRating;
    spots.previewImage = previewImage ? previewImage.url : ''

    res.json({ Spots: [spots] })
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req;
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId)

    if(!spot) {
        res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    if(user.id !== spot.ownerId) {
        const bookings = await Booking.findAll({
            where: { spotId: spotId },
            attributes: ['spotId', 'startDate', 'endDate']
        })

        res.json({ Bookings: bookings })
    } else {
        const bookings = await Booking.findAll({
            where: { spotId: spotId },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })

        res.json({ Bookings: bookings })
    }
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { user } = req;
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId)

    if(!spot) {
        res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    let startDateString = new Date(startDate).toDateString()
    let endDateString = new Date(endDate).toDateString()

    let startDateTime = new Date(startDateString).getTime()
    let endDateTime = new Date(endDateString).getTime()

    if(startDateTime >= endDateTime) {
        res.status(400).json({
            message: 'Bad Request',
            errors: {
                endDate: 'endDate cannot be on or before startDate'
            }
        })
    }

    const bookings = await Booking.findAll({
        where: { spotId: spotId }
    })

    for(let booking of bookings) {
        let newStartDate = new Date(booking.startDate).toDateString()
        let newEndDate = new Date(booking.endDate).toDateString()

        newStartDate = new Date(newStartDate).getTime()
        newEndDate = new Date(newEndDate).getTime()

        if((startDateTime >= newStartDate && startDateTime < newEndDate) ||
        (endDateTime > newStartDate && endDateTime <= newEndDate) ||
        (startDateTime <= newStartDate && endDateTime >= newEndDate)) {
            res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            })
        }
    }

    if(user.id !== spot.ownerId) {
        const newBooking = await Booking.create({
            spotId,
            userId: user.id,
            startDate,
            endDate
        })

        res.json(newBooking)
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId)

    if(!spot) {
        res.status(404).json({
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

    res.json({ Reviews: arr })
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
        res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    if(reviewSubmitted) {
        res.status(500).json({
            message: "User already has a review for this spot"
        })
    }

    const newReview = await Review.create({
        userId: user.id,
        spotId: spot.id,
        review,
        stars
    })

    res.status(201).json(newReview)
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const { user } = req;
    let spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    if(user.id === spot.ownerId) {
        const image = await spot.createSpotImage({
            url,
            preview
        })

        res.json({
            id: image.id,
            url,
            preview
        })
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId)

    if(!spot) {
        res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    const spotImage = await SpotImage.findAll({
        attributes: ['id', 'url', 'preview'],
        where: { spotId: spotId, preview: true }
    })

    const owner = await User.findOne({
        attributes: ['id', 'firstName', 'lastName'],
        where: { id: spotId }
    })

    const numReviews = await Review.count({
        where: { spotId: spotId }
    })

    const sumRating = await Review.sum('stars', {
        where: { spotId: spotId }
    })

    const avgRating = sumRating / numReviews;

    spot = spot.toJSON()
    spot.numReviews = numReviews;
    spot.avgRating = avgRating;
    spot.SpotImages = spotImage;
    spot.Owner = owner;

    res.json(spot)
})

// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;
    let spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        res.status(404).json({
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

        res.json(spot)
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { user } = req;
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        res.status(404).json({
            message: `Spot couldn't be found`
        })
    }

    if(user.id === spot.ownerId) {
        await spot.destroy();

        res.json({
            "message": "Successfully deleted"
        })
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
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
        spot.avgRating = avgRating;
        spot.previewImage = previewImage ? previewImage.url : ''

        arr.push(spot);
    }

    res.json({ Spots: arr })
});

// Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
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

    res.status(201).json(newSpot)
})



module.exports = router;
