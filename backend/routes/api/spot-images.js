const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();

// Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req;
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: { model: Spot, attributes: ['ownerId'] }
    });
    // const spot = await Spot.findByPk(spotImage.spotId)

    if(!spotImage) {
        res.status(404).json({
            message: `Spot Image couldn't be found`
        })
    }

    if(user.id === spotImage.Spot.ownerId) {
        await spotImage.destroy();

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
