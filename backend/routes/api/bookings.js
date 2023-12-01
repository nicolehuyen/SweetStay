const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const { id } = req.user;
    let bookings = await Booking.findAll({
        where: { userId: id }
    })
    let arr = [];

    for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i]

        let spot = await Spot.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt', 'description'] },
            where: { id: id }
        })

        const previewImage = await SpotImage.findOne({
            attributes: ['url'],
            where: { spotId: id, preview: true }
        })

        booking = booking.toJSON();
        spot = spot.toJSON();
        spot.previewImage = previewImage ? previewImage.url : ''
        booking.Spot = spot;

        arr.push(booking)
    }

    res.json({ Bookings: arr })
})

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { user } = req;
    let updateBooking = await Booking.findByPk(req.params.bookingId);

    if(!updateBooking) {
        res.status(404).json({
            message: `Booking couldn't be found`
        })
    }

    let startDateString = new Date(startDate).toDateString()
    let endDateString = new Date(endDate).toDateString()

    let startDateTime = new Date(startDateString).getTime()
    let endDateTime = new Date(endDateString).getTime()

    if(startDateTime > endDateTime) {
        res.status(400).json({
            message: 'Bad Request',
            errors: {
                endDate: 'endDate cannot come before startDate'
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
        res.status(403).json({
            message: "Past bookings can't be modified"
        })
    }

    const bookings = await Booking.findAll({
        where: { spotId: updateBooking.spotId }
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

    if(user.id === updateBooking.userId) {
        updateBooking.startDate = startDate || updateBooking.startDate;
        updateBooking.endDate = endDate || updateBooking.endDate;

        await updateBooking.save();

        res.json(updateBooking)
    } else {
        res.status(403).json({
            message: "Forbidden"
        })
    }
})

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req;
    let booking = await Booking.findByPk(req.params.bookingId);

    if(!booking) {
        res.status(404).json({
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
        res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        })
    }

    const spot = await Spot.findOne({
        where: { ownerId: user.id }
    })

    if(user.id === booking.userId || spot.ownerId === booking.spotId) {
        await booking.destroy();

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
