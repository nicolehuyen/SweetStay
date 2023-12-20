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
      state: 'California',
      country: 'United States of America',
      lat: 36.7782595,
      lng: -119.4179312,
      name: 'Private Room in Sunny LA',
      description: 'Welcome to a private room in our Spanish-style casita! Centrally located, close to LAX and all major highways.This is 1 Bed/1 Bath rental within a spacious 3 bed/2 bath home - You will have your own private bedroom and bathroom accessible via a private entrance. You will also have access to the main living spaces, dining and kitchen. I also reside on the property along with my Boston Terrier, Potter.',
      price: 88
    },
    {
      ownerId: 2,
      address: '222 Hatteras Drive',
      city: 'Austin',
      state: 'Texas',
      country: 'United States of America',
      lat: 30.2671534,
      lng: -97.7430573,
      name: 'The Chill Den',
      description: `Welcome to Austin. Welcome home! This is my home, a place I'd like to share. If you plan to explore the city during the day and a refreshing peaceful sleep at night, this is a perfect place for you. Located only 15 mins from The Domain and 20 mins from Downtown, you will have easy access to everything Austin has to offer without compromising on safety.`,
      price: 50
    },
    {
      ownerId: 3,
      address: '333 Tompkins Avenue',
      city: 'Brooklyn',
      state: 'New York',
      country: 'United States of America',
      lat: 40.7127763,
      lng: -74.0059744,
      name: 'Cozy Private Bedroom in BedStuy',
      description: 'Come stay in the spacious, sun filled 2.5 bedroom apartment in a beautiful brownstone. Located in residential BedSty area a few blocks from the G train the apt is within walking distance to shops, restaurants, and artisan coffee. You will also have an access to a cute rooftop with lounging chairs. Please note that Brooklyn is a lively and vibrant place, my neighbors like to grill out and play music, come stay if you enjoy the neighborhood feel.',
      price: 118
    },
    {
      ownerId: 4,
      address: '444 Vineland Road',
      city: 'Orlando',
      state: 'Florida',
      country: 'United States of America',
      lat: 27.9505753,
      lng: -82.4571760,
      name: 'Two Queen Beds Close to Disney',
      description: "Our room includes two queen size beds and a private bathroom. Our hotel offers a on-site restaurant and bar, 24 hour fitness center, and resort style pool. Experience a beautiful hotel in Lake Buena Vista! Our hotel focuses on the details while blending the excitement of the area’s most sought-after entertainment with luxurious accommodations skillfully designed to meet the needs of the next-gen savvy travelers.This stylish and unique place sets the stage for a memorable trip.",
      price: 89
    },
    {
      ownerId: 5,
      address: '555 Dearborn Street',
      city: 'Chicago',
      state: 'Illinois',
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
      state: 'Georgia',
      country: 'United States of America',
      lat: 50.7782555,
      lng: -100.4134312,
      name: 'Historic Westend',
      description: `Welcome to our home! We are a beautifully blended family that loves to host. As Morehouse and Spelman graduates, we are thrilled to have returned to the Historic Westend and to share our space with travelers. We are right on the bus line, close to downtown, and literally 30-seconds from the highway. Our home offers great wifi and a whole lot of peace. Enjoy yourself by walking to the Beltline, having lunch at the Slutty Vegan or hanging out at one of the local breweries.`,
      price: 56
    },
    {
      ownerId: 7,
      address: '678 Villa Place',
      city: 'Nashville',
      state: 'Tennessee',
      country: 'United States of America',
      lat: 24.1231534,
      lng: -96.7240573,
      name: 'Historic Music Row',
      description: `Beautiful historic home, world-famous Music Row. A family home, on a family street where friends can visit on the front porch and write a song or two. High ceilings, transom windows, wood floors. Walk to Edgehill Village, Belmont, Vanderbilt, Broadway, The Gulch. We look forward to sharing Music City with you. Private Room/Attached Private Bath. First floor is staged for guests of property- dedicated guest kitchen, dining, living room, outdoor spaces. Hosts live on connected second floor.`,
      price: 101
    },
    {
      ownerId: 8,
      address: '456 Avery Street',
      city: 'Boston',
      state: 'Massachusetts',
      country: 'United States of America',
      lat: 61.7127763,
      lng: -85.0059744,
      name: 'Modern Apartment in Boston',
      description: `Perfect Boston location - steps from Boylston Station and the Boston Common Park - situated in the downtown Theatre District close to Chinatown & South Station - easy walk in any direction to reach shopping and historical tourist spot.`,
      price: 249
    },
    {
      ownerId: 9,
      address: '7895 51st Avenue',
      city: 'Portland',
      state: 'Oregon',
      country: 'United States of America',
      lat: 20.9505753,
      lng: -60.4571760,
      name: 'Benji and Friends',
      description: `Welcome to Benji and Friends! Go enjoy all of Portland during the day and relax and recharge here at night. Located on the main level, this private room is as comfortable as it gets. Rest up in the Tuft & Needle Mint king bed with lots of pillows. There’s ample storage with a dresser, luggage rack, and closet. Get some work done at the desk or enjoy some down time using the 43-inch TV or Alexa speaker. Feeling peckish? Grab a free snack in the mini fridge! Love dogs? You’re in luck–we have four!`,
      price: 43
    },
    {
      ownerId: 10,
      address: '8674 Irving Street',
      city: 'Denver',
      state: 'Colorado',
      country: 'United States of America',
      lat: 55.8781130,
      lng: -80.6297997,
      name: 'Modern Townhome with Backyard Patio and Rooftop',
      description: `Quiet private room and bath in conveniently located townhouse - 4 blocks to Sloan's Lake & Broncos Stadium and easy access to I-25. Only 10 minutes to Downtown Denver. Close to the new shops and restaurants including Highlands and Edgewater Marketplace.`,
      price: 75
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
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    }, {})
  }
};
