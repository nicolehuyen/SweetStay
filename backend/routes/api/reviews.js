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
    const { user } = req;
    let reviews = await Review.findAll({
        where: { userId: user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price' ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ],
        order: [ [ ReviewImage, 'id' ] ]
    })
    let arr = [];

    for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i]

        const previewImage = await SpotImage.findByPk(review.Spot.id, {
            attributes: ['url'],
            where: { preview: true }
        })

        review = review.toJSON();
        review.Spot.previewImage = previewImage ? previewImage.url : null

        arr.push(review)
    }

    return res.json({ Reviews: arr })
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const { user } = req;
    const { reviewId } = req.params;
    let review = await Review.findByPk(reviewId);

    if(!review) {
        return res.status(404).json({
            message: `Review couldn't be found`
        })
    }

    if(user.id === review.userId) {
        const reviewImages = await ReviewImage.count({
            where: { reviewId }
        })

        if(reviewImages >= 10) {
            return res.status(403).json({
                message: `Maximum number of images for this resource was reached`
            })
        }

        const image = await review.createReviewImage({
            url
        })

        return res.json({
            id: image.id,
            url
        })
    } else {
        return res.status(403).json({
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
        return res.status(404).json({
            message: `Review couldn't be found`
        })
    }

    if(user.id === updateReview.userId) {
        updateReview.review = review || updateReview.review;
        updateReview.stars = stars || updateReview.stars;

        await updateReview.save();

        return res.json(updateReview)
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req;
    let review = await Review.findByPk(req.params.reviewId);

    if(!review) {
        return res.status(404).json({
            message: `Review couldn't be found`
        })
    }

    if(user.id === review.userId) {
        await review.destroy();

        return res.json({
            "message": "Successfully deleted"
        })
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})

module.exports = router;
