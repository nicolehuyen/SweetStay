'use strict';

const { Review } = require('../models');

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
   await Review.bulkCreate([
    {
      spotId: 1,
      userId: 1,
      review: 'nice, clean place',
      stars: 4
    },
    {
      spotId: 2,
      userId: 2,
      review: 'host was nice and responsive',
      stars: 5
    },
    {
      spotId: 3,
      userId: 3,
      review: 'floors were dirty',
      stars: 2
    },
    {
      spotId: 4,
      userId: 4,
      review: 'nice home',
      stars: 3
    },
    {
      spotId: 5,
      userId: 5,
      review: 'fantastic place',
      stars: 5
    },
    {
      spotId: 6,
      userId: 6,
      review: 'nice host',
      stars: 4
    },
    {
      spotId: 7,
      userId: 7,
      review: 'great place',
      stars: 4
    },
    {
      spotId: 8,
      userId: 8,
      review: 'nasty! do not stay here',
      stars: 1
    },
    {
      spotId: 9,
      userId: 9,
      review: 'gross place',
      stars: 2
    },
    {
      spotId: 10,
      userId: 10,
      review: 'great home',
      stars: 5
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {})
  }
};
