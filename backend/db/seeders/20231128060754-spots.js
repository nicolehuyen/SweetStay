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
      address: '111 4th Avenue',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States of America',
      lat: 36.7782595,
      lng: -119.4179312,
      name: 'Private Room in Sunny LA',
      description: 'Welcome to a private room in our Spanish-style casita! Centrally located, close to LAX and all major highways. This is a 1 Bed/1 Bath rental within a spacious 3 bed/2 bath home.',
      price: 88
    },
    {
      ownerId: 2,
      address: '222 Hatteras Drive',
      city: 'Austin',
      state: 'TX',
      country: 'United States of America',
      lat: 30.2671534,
      lng: -97.7430573,
      name: 'The Chill Den',
      description: `Welcome to Austin. This is my home, a place I'd like to share. If you plan to explore the city during the day and a refreshing peaceful sleep at night, this is a perfect place for you.`,
      price: 50
    },
    {
      ownerId: 3,
      address: '333 Tompkins Avenue',
      city: 'Brooklyn',
      state: 'NY',
      country: 'United States of America',
      lat: 40.7127763,
      lng: -74.0059744,
      name: 'Cozy Private Bedroom in BedStuy',
      description: 'Come stay in the spacious, sun filled 2.5 bedroom apartment in a beautiful brownstone. The apartment is within walking distance to shops, restaurants, and artisan coffee.',
      price: 118
    },
    {
      ownerId: 4,
      address: '444 Vineland Road',
      city: 'Orlando',
      state: 'FL',
      country: 'United States of America',
      lat: 27.9505753,
      lng: -82.4571760,
      name: 'Two Queen Beds Close to Disney',
      description: "Our room includes two queen size beds and a private bathroom. Our hotel offers an on-site restaurant and bar, 24 hour fitness center, and resort style pool. Experience a beautiful hotel in Lake Buena Vista!",
      price: 89
    },
    {
      ownerId: 5,
      address: '555 Dearborn Street',
      city: 'Chicago',
      state: 'IL',
      country: 'United States of America',
      lat: 41.8781130,
      lng: -87.6297997,
      name: 'King Bedroom with Glass Fireplace',
      description: 'Gold Coast stunner with newly-renovated rooms, bar, and an onsite spa and fitness center. Well-situated location puts you steps from Lake Michigan and high-end Gold Coast boutiques.',
      price: 127
    },
    {
      ownerId: 6,
      address: '1806 Oak Street',
      city: 'Atlanta',
      state: 'GA',
      country: 'United States of America',
      lat: 50.7782555,
      lng: -100.4134312,
      name: 'Historic Westend',
      description: `Welcome to our home! We are a beautifully blended family that loves to host. As Morehouse and Spelman graduates, we are thrilled to have returned to the Historic Westend and to share our space with travelers.`,
      price: 56
    },
    {
      ownerId: 7,
      address: '678 Villa Place',
      city: 'Nashville',
      state: 'TN',
      country: 'United States of America',
      lat: 24.1231534,
      lng: -96.7240573,
      name: 'Historic Music Row',
      description: `Welcome to our world-famous Music Row. A family home on a family street where friends can visit on the front porch and write a song or two.`,
      price: 101
    },
    {
      ownerId: 8,
      address: '456 Avery Street',
      city: 'Boston',
      state: 'MA',
      country: 'United States of America',
      lat: 61.7127763,
      lng: -85.0059744,
      name: 'Modern Apartment in Boston',
      description: `We are steps from Boylston Station and the Boston Common Park. We are situated in the downtown Theatre District close to Chinatown and South Station. There are easy walks in any direction to reach shopping and historical tourist spots.`,
      price: 249
    },
    {
      ownerId: 9,
      address: '7895 51st Avenue',
      city: 'Portland',
      state: 'OR',
      country: 'United States of America',
      lat: 20.9505753,
      lng: -60.4571760,
      name: 'Benji and Friends',
      description: `Welcome to Benji and Friends! Go enjoy all of Portland during the day and relax and recharge here at night. Located on the main level, this private room is as comfortable as it gets. Rest up in the Tuft & Needle Mint king bed with lots of pillows.`,
      price: 43
    },
    {
      ownerId: 10,
      address: '8674 Irving Street',
      city: 'Denver',
      state: 'CO',
      country: 'United States of America',
      lat: 55.8781130,
      lng: -80.6297997,
      name: 'Modern Townhome with Backyard Patio and Rooftop',
      description: `Quiet private room and bath in conveniently located townhouse. 4 blocks to Sloan's Lake and Broncos Stadium and easy access to I-25. Only 10 minutes to Downtown Denver. Close to the new shops and restaurants including Highlands and Edgewater Marketplace.`,
      price: 75
    },
    {
      ownerId: 11,
      address: '506 Squaw Valley Lane',
      city: 'Angel Fire',
      state: 'NM',
      country: 'United States of America',
      lat: 50.8781130,
      lng: -70.6297997,
      name: 'Blue Mountain Escape',
      description: `Have the ultimate Rocky Mountain experience when you stay at this one-of-a-kind, custom luxury chalet. Outfitted with all the latest modern conveniences and much more, the exquisite blend of contemporary and mountain styles come together to create a perfect atmosphere for your Angel Fire Mountain vacation.`,
      price: 995
    },
    {
      ownerId: 12,
      address: '1234 Fairview Drive',
      city: 'Mineral',
      state: 'VA',
      country: 'United States of America',
      lat: 85.8781130,
      lng: -60.6297997,
      name: 'Lakefront with Beach, Views, and Wifi at Lake Anna',
      description: `Blue Heron Hideaway is a brand new lakefront home with amazing views on the Private Side of Lake Anna. We have fully equipped the home with everything you will likely need, because our goal is that you just have to pack your clothes, swimming suits, and water shoes.`,
      price: 215
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {})
  }
};
