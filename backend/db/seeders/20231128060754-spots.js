'use strict';

const { Spot } = require('../models');

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
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: '111 Hollywood Drive',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States of America',
      lat: 36.7782595,
      lng: -119.4179312,
      name: 'Home One',
      description: 'Nice two story home',
      price: 100
    },
    {
      ownerId: 2,
      address: '222 Lily Road',
      city: 'Austin',
      state: 'Texas',
      country: 'United States of America',
      lat: 30.2671534,
      lng: -97.7430573,
      name: 'Home Two',
      description: 'Cool one story home',
      price: 85
    },
    {
      ownerId: 3,
      address: '333 Happy Blvd',
      city: 'New York City',
      state: 'New York',
      country: 'United States of America',
      lat: 40.7127763,
      lng: -74.0059744,
      name: 'Home Three',
      description: 'Small trendy home',
      price: 140
    }
    // {
    //   ownerId: 4,
    //   address: '444 Meadow Lane',
    //   city: 'Tampa',
    //   state: 'Florida',
    //   country: 'United States of America',
    //   lat: 27.9505753,
    //   lng: -82.4571760,
    //   name: 'Home Four',
    //   description: 'Cozy two story home',
    //   price: 95
    // },
    // {
    //   ownerId: 5,
    //   address: '555 Hustle Street',
    //   city: 'Chicago',
    //   state: 'Illinois',
    //   country: 'United States of America',
    //   lat: 41.8781130,
    //   lng: -87.6297997,
    //   name: 'Home Five',
    //   description: 'Urban one story home',
    //   price: 125
    // }
  ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
