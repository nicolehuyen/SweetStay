const express = require('express')

const { requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');

const router = express.Router();

// get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()

    res.json('Spots:', spots)
})

router.get('/current', requireAuth, async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findByPk(id);
    const spots = await Spot.findAll({

    })
})

module.exports = router;
