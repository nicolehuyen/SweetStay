'use strict';

const { SpotImage } = require('../models');

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
   await SpotImage.bulkCreate([
    {
      spotId: 1,
      url: 'url string',
      preview: true
    },
    {
      spotId: 2,
      url: 'url string 2',
      preview: true
    },
    {
      spotId: 3,
      url: 'url string 3',
      preview: true
    },
    {
      spotId: 4,
      url: 'url string 4',
      preview: true
    },
    {
      spotId: 5,
      url: 'url string 5',
      preview: true
    },
    {
      spotId: 6,
      url: 'url string 6',
      preview: false
    },
    {
      spotId: 7,
      url: 'url string 7',
      preview: false
    },
    {
      spotId: 8,
      url: 'url string 8',
      preview: false
    },
    {
      spotId: 9,
      url: 'url string 9',
      preview: false
    },
    {
      spotId: 10,
      url: 'url string 10',
      preview: false
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {})
  }
};
