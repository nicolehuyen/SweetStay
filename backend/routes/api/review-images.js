const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');

const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req;
    const reviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: { model: Review, attributes: ['userId'] }
    });

    if(!reviewImage) {
        return res.status(404).json({
            message: `Review Image couldn't be found`
        })
    }

    if(user.id === reviewImage.Review.userId) {
        await reviewImage.destroy();

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
