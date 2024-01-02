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
        userId: 2,
        startDate: '2024-01-22',
        endDate: '2024-01-29'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2024-03-15',
        endDate: '2024-03-20'
      },
      {
        spotId: 3,
        userId: 4,
        startDate: '2024-10-05',
        endDate: '2024-10-07'
      },
      {
        spotId: 4,
        userId: 5,
        startDate: '2024-04-26',
        endDate: '2024-04-29'
      },
      {
        spotId: 5,
        userId: 6,
        startDate: '2024-09-06',
        endDate: '2024-09-08'
      },
      {
        spotId: 6,
        userId: 7,
        startDate: '2024-11-11',
        endDate: '2024-11-13'
      },
      {
        spotId: 7,
        userId: 8,
        startDate: '2024-12-29',
        endDate: '2024-12-31'
      },
      {
        spotId: 8,
        userId: 9,
        startDate: '2024-03-20',
        endDate: '2024-03-23'
      },
      {
        spotId: 9,
        userId: 10,
        startDate: '2024-07-02',
        endDate: '2024-07-05'
      },
      {
        spotId: 10,
        userId: 11,
        startDate: '2024-02-18',
        endDate: '2024-02-20'
      },
      {
        spotId: 11,
        userId: 12,
        startDate: '2024-01-03',
        endDate: '2024-01-07'
      },
      {
        spotId: 12,
        userId: 1,
        startDate: '2024-05-24',
        endDate: '2024-05-27'
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {})
  }
};
