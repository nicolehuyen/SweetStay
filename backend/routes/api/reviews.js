const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Review, User, Spot, SpotImage, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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
    const { reviewId } = req.params;
    let review = await Review.findByPk(reviewId);
    const reviewImages = await ReviewImage.count({
        where: { reviewId }
    })

    if(!review) {
        res.status = 404;
        res.json({
            message: `Review couldn't be found`
        })
    }

    if(reviewImages >= 10) {
        res.status = 403;
        res.json({
            message: `Maximum number of images for this resource was reached`
        })
    }

    if(user.id === review.userId) {
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

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body;
    const { user } = req;
    let updateReview = await Review.findByPk(req.params.reviewId);

    if(!updateReview) {
        res.status = 404;
        res.json({
            message: `Review couldn't be found`
        })
    }

    if(user.id === updateReview.userId) {
        updateReview.review = review || updateReview.review;
        updateReview.stars = stars || updateReview.stars;

        await updateReview.save();

        res.json(updateReview)
    } else {
        res.json({
            message: "Forbidden"
        })
    }
})

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req;
    let review = await Review.findByPk(req.params.reviewId);

    if(!review) {
        res.status = 404;
        res.json({
            message: `Review couldn't be found`
        })
    }

    if(user.id === review.userId) {
        await review.destroy();

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
