const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');

const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req;
    const reviewImage = await ReviewImage.findByPk(req.params.imageId);
    const review = await Review.findByPk(reviewImage.reviewId)

    if(!reviewImage) {
        res.status(404).json({
            message: `Review Image couldn't be found`
        })
    }

    if(user.id === review.userId) {
        await reviewImage.destroy();

        res.json({
            "message": "Successfully deleted"
        })
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
})

module.exports = router;
