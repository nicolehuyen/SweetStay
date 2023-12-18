const express = require('express');
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    let bookings = await Booking.findAll({
        where: { userId: user.id }
    })
    let arr = [];

    for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i]

        let spot = await Spot.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt', 'description'] },
            where: { id: booking.spotId }
        })

        const previewImage = await SpotImage.findOne({
            attributes: ['url'],
            where: { spotId: booking.spotId, preview: true }
        })

        booking = booking.toJSON();
        spot = spot.toJSON();
        spot.previewImage = previewImage ? previewImage.url : null
        booking.Spot = spot;

        arr.push(booking)
    }

    return res.json({ Bookings: arr })
})

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { user } = req;
    let updateBooking = await Booking.findByPk(req.params.bookingId);

    if(!updateBooking) {
        return res.status(404).json({
            message: `Booking couldn't be found`
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

    const start = Date.now()
    let currentDate = new Date(start).toDateString()
    currentDate = new Date(currentDate).getTime()

    let bookingEndDate = updateBooking.endDate
    bookingEndDate = new Date(bookingEndDate).toDateString()
    bookingEndDate = new Date(bookingEndDate).getTime()

    if(currentDate > bookingEndDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        })
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: updateBooking.spotId,
            id: { [Op.not]: [ updateBooking.id ] }
        }
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

    if(user.id === updateBooking.userId) {
        updateBooking.startDate = startDate || updateBooking.startDate;
        updateBooking.endDate = endDate || updateBooking.endDate;

        await updateBooking.save();

        return res.json(updateBooking)
    } else {
        return res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req;
    let booking = await Booking.findByPk(req.params.bookingId);

    if(!booking) {
        return res.status(404).json({
            message: `Booking couldn't be found`
        })
    }

    const start = Date.now()
    let currentDate = new Date(start).toDateString()
    currentDate = new Date(currentDate).getTime()

    let bookingStartDate = booking.startDate
    bookingStartDate = new Date(bookingStartDate).toDateString()
    bookingStartDate = new Date(bookingStartDate).getTime()

    if(currentDate > bookingStartDate) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    if(user.id === booking.userId) {
        await booking.destroy();

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
