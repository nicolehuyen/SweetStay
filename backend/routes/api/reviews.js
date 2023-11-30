const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models');

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { id } = req.user;
    let reviews = await Review.findAll({
        where: { userId: id }
    })
    let arr = [];

    for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i]

        const user = await User.findOne({
            attributes: ['id', 'firstName', 'lastName'],
            where: { id: id }
        })

        let spot = await Spot.findOne({
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price' ],
            where: { id: id }
        })

        const previewImage = await SpotImage.findOne({
            attributes: ['url'],
            where: { spotId: id }
        })

        const reviewImage = await ReviewImage.findAll({
            attributes: ['id', 'url'],
            where: { reviewId: id }
        })

        review = review.toJSON();
        review.User = user;
        spot = spot.toJSON();
        spot.previewImage = previewImage.url;
        review.Spot = spot;
        review.ReviewImages = reviewImage;

        arr.push(review)
    }

    res.json({ Reviews: arr })
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const { user } = req;
    let review = await Review.findByPk(req.params.reviewId);

    if(!review) {
        res.status = 404;
        res.json({
            message: `Review couldn't be found`
        })
    }

    if(ReviewImage.id > 10) {
        res.status = 403;
        res.json({
            message: `Maximum number of images for this resource was reached`
        })
    }

    if(user.id == review.reviewId) {
        const image = await review.createReviewImage({
            url
        })

        res.json({
            id: image.id,
            url
        })
    } else {
        res.json({
            message: "Forbidden"
        })
    }

})


module.exports = router;
