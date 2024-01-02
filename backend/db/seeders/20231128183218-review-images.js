'use strict';

const { ReviewImage } = require('../models');

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
   await ReviewImage.bulkCreate([
    {
      reviewId: 1,
      url: 'url string 1'
    },
    {
      reviewId: 2,
      url: 'url string 2'
    },
    {
      reviewId: 3,
      url: 'url string 3'
    },
    {
      reviewId: 4,
      url: 'url string 4'
    },
    {
      reviewId: 5,
      url: 'url string 5'
    },
    {
      reviewId: 6,
      url: 'url string 6'
    },
    {
      reviewId: 7,
      url: 'url string 7'
    },
    {
      reviewId: 8,
      url: 'url string 8'
    },
    {
      reviewId: 9,
      url: 'url string 9'
    },
    {
      reviewId: 10,
      url: 'url string 10'
    },
    {
      reviewId: 11,
      url: 'url string 11'
    },
    {
      reviewId: 12,
      url: 'url string 12'
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
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {})
  }
};
