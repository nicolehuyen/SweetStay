'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-01-22',
        endDate: '2023-01-29'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-03-15',
        endDate: '2023-03-20'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-10-05',
        endDate: '2023-10-07'
      },
      {
        spotId: 4,
        userId: 4,
        startDate: '2023-04-26',
        endDate: '2023-04-29'
      },
      {
        spotId: 5,
        userId: 5,
        startDate: '2023-09-06',
        endDate: '2023-09-08'
      },
      {
        spotId: 6,
        userId: 6,
        startDate: '2023-11-11',
        endDate: '2023-11-13'
      },
      {
        spotId: 7,
        userId: 7,
        startDate: '2023-12-29',
        endDate: '2023-12-31'
      },
      {
        spotId: 8,
        userId: 8,
        startDate: '2023-03-20',
        endDate: '2023-03-23'
      },
      {
        spotId: 9,
        userId: 9,
        startDate: '2023-07-02',
        endDate: '2023-07-05'
      },
      {
        spotId: 10,
        userId: 10,
        startDate: '2023-02-18',
        endDate: '2023-02-20'
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {})
  }
};
