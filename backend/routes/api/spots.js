const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review } = require('../../db/models');

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
      .isFloat( { min: -90, max: 90 })
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isFloat( { min: -180, max: 180 })
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
        where: { spotId: id }
    })

    spots = spots.toJSON()
    spots.avgRating = avgRating;
    spots.previewImage = previewImage.url;

    res.json({ Spots: [spots] })
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
            where: { spotId: spot.id }
        })

        spot = spot.toJSON()
        spot.avgRating = avgRating;
        spot.previewImage = previewImage;

        arr.push(spot)
    }

    res.json({ Spots: arr })
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    let spot = await Spot.findByPk(spotId)

    if(!spot) {
        res.status = 404;
        res.json({
            message: `Spot couldn't be found`
        })
    }

    const spotImage = await SpotImage.findAll({
        attributes: ['id', 'url', 'preview'],
        where: { spotId: spotId }
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

    res.json(newSpot)
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const { user } = req;
    let spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        res.status = 404;
        res.json({
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
        res.json({
            message: "Forbidden"
        })
    }
})

// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;
    let spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        res.status = 404;
        res.json({
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
        res.json({
            message: "Forbidden"
        })
    }
})

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { user } = req;
    const spot = await Spot.findByPk(req.params.spotId);

    if(!spot) {
        res.status = 404;
        res.json({
            message: `Spot couldn't be found`
        })
    }

    if(user.id === spot.ownerId) {
        await spot.destroy();

        res.json({
            "message": "Successfully deleted"
        })
    } else {
        res.json({
            message: "Forbidden"
        })
    }
})

module.exports = router;
