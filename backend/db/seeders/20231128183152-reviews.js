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
      userId: 2,
      review: 'A home away from home! This Airbnb was cozy, clean, and beautifully decorated. The host thought of every detail to make our stay comfortable and enjoyable.',
      stars: 5
    },
    {
      spotId: 1,
      userId: 3,
      review: 'Great location and stylish space. The host was responsive and accommodating.',
      stars: 4
    },
    {
      spotId: 1,
      userId: 4,
      review: 'Modern amenities and a prime location. The bed was a bit too firm for our liking, but the overall experience was positive. The host provided great local recommendations.',
      stars: 4
    },
    {
      spotId: 2,
      userId: 3,
      review: `A hidden gem! This Airbnb was tucked away in a quiet neighborhood. The host's attention to detail made our stay memorable.`,
      stars: 5
    },
    {
      spotId: 2,
      userId: 4,
      review: 'Nice and spacious, but the cleanliness could have been better. Found some dust in corners, but the host was quick to address our concerns. Good value for the price.',
      stars: 3
    },
    {
      spotId: 2,
      userId: 5,
      review: `Unforgettable Austin Experience! This home captured the essence of Austin living. From the vibrant decor to the cozy backyard, every detail reflected the city's unique charm.`,
      stars: 5
    },
    {
      spotId: 3,
      userId: 4,
      review: 'Charming Brownstone Retreat! The 2.5 bedroom apartment was spacious and filled with natural light, creating a warm and inviting atmosphere.',
      stars: 4
    },
    {
      spotId: 3,
      userId: 5,
      review: 'The G train nearby made exploring easy, and the local shops and restaurants provided a taste of authentic Brooklyn living. A fantastic home base for our New York City adventure!',
      stars: 5
    },
    {
      spotId: 3,
      userId: 6,
      review: 'This Airbnb had a minimalist design that we loved. The host was attentive, and the location was perfect for exploring the city.',
      stars: 5
    },
    {
      spotId: 4,
      userId: 5,
      review: 'Fantastic Family Stay! Our room with two queen beds was spacious and comfortable, providing the perfect retreat after a day of exploring the nearby attractions. The private bathroom was a great convenience, and the on-site restaurant served delicious meals.',
      stars: 5
    },
    {
      spotId: 4,
      userId: 6,
      review: 'The on-site restaurant and bar offered tasty options, and the resort-style pool provided a refreshing escape. The 24-hour fitness center was a great bonus. A top-notch hotel experience!',
      stars: 5
    },
    {
      spotId: 4,
      userId: 7,
      review: 'Great Getaway Spot! Our stay at this Lake Buena Vista hotel was delightful. The room with two queen beds was comfortable and clean, and the private bathroom was a nice touch.',
      stars: 4
    },
    {
      spotId: 5,
      userId: 6,
      review: 'Luxury Defined! This Gold Coast Airbnb was a true stunner. The newly-renovated rooms were not only stylish but also incredibly comfortable. The on-site bar provided a chic atmosphere for evening relaxation, and the spa and fitness center were a welcome touch.',
      stars: 5
    },
    {
      spotId: 5,
      userId: 7,
      review: 'Sophisticated Retreat! Our stay in this Gold Coast gem was nothing short of exceptional. The newly-renovated rooms exuded luxury and style.',
      stars: 5
    },
    {
      spotId: 5,
      userId: 8,
      review: 'Perfect Blend of Comfort and Class! This Gold Coast Airbnb exceeded all expectations. The newly-renovated rooms were not only aesthetically pleasing but also provided the utmost comfort.',
      stars: 5
    },
    {
      spotId: 6,
      userId: 7,
      review: `A Warm Welcome in the Historic Westend! Staying at this beautifully blended family's home was a true delight. The warmth and hospitality extended by the hosts, who are Morehouse and Spelman graduates, made our visit special.`,
      stars: 5
    },
    {
      spotId: 6,
      userId: 8,
      review: 'From the moment we walked in, we felt like cherished guests. The attention to detail in every corner of the home, combined with the rich history of the Historic Westend, made for a perfect stay.',
      stars: 5
    },
    {
      spotId: 6,
      userId: 9,
      review: `A Home Away From Home! Returning to the Historic Westend through the doors of this lovingly hosted Airbnb was a true pleasure. The beautifully blended family's hospitality was beyond compare, creating a sense of belonging.`,
      stars: 5
    },
    {
      spotId: 7,
      userId: 8,
      review: 'The high ceilings and transom windows added to the charm of the space. While the wood floors gave it a nostalgic feel, some areas felt a bit worn. The front porch was a great spot to gather with friends and share creative moments.',
      stars: 4
    },
    {
      spotId: 7,
      userId: 9,
      review: 'While the high ceilings were impressive, the transom windows could use a bit more maintenance. Wood floors added character, but some areas felt a bit creaky. Overall, a decent stay for those looking for a musical touch in a historic setting.',
      stars: 3
    },
    {
      spotId: 7,
      userId: 10,
      review: `Despite minor wear in some areas, the overall experience was fantastic. A must for anyone looking to immerse themselves in Nashville's musical history!`,
      stars: 5
    },
    {
      spotId: 8,
      userId: 9,
      review: `While the overall experience was great, the space could use a bit of updating. Nonetheless, the easy walk to shopping and historical spots made it a worthwhile stay.`,
      stars: 4
    },
    {
      spotId: 8,
      userId: 10,
      review: 'Although the location was fantastic, the accommodations were somewhat basic and in need of a refresh. A decent stay for those prioritizing location over luxury.',
      stars: 3
    },
    {
      spotId: 8,
      userId: 11,
      review: `The ability to walk in any direction to reach shopping and historical spots was a huge plus. Despite minor cosmetic details, the overall experience was fantastic. Ideal for those looking to explore Boston's best attractions!`,
      stars: 5
    },
    {
      spotId: 9,
      userId: 10,
      review: `While the space was indeed comfortable, some minor details could enhance the overall experience. Nevertheless, it's a perfect spot for recharging after exploring the vibrant city of Portland!`,
      stars: 4
    },
    {
      spotId: 9,
      userId: 11,
      review: 'The main level location was convenient, and the abundance of pillows was a nice touch.',
      stars: 4
    },
    {
      spotId: 9,
      userId: 12,
      review: `Benji and Friends offered a tranquil retreat after a day of exploring the city. The Tuft & Needle Mint king bed was exceptionally comfortable, ensuring a restful night's sleep.`,
      stars: 5
    },
    {
      spotId: 10,
      userId: 11,
      review: `The proximity to new shops and restaurants, including Highlands and Edgewater Marketplace, added to the overall appeal. A perfect spot for a Denver getaway!`,
      stars: 5
    },
    {
      spotId: 10,
      userId: 12,
      review: `Our stay in this townhouse was fantastic. The quiet and private room, along with its own bathroom, provided a comfortable retreat.`,
      stars: 5
    },
    {
      spotId: 10,
      userId: 1,
      review: `Staying in this conveniently located townhouse was a great experience. The quiet private room and bath were comfortable and well-maintained.`,
      stars: 4
    },
    {
      spotId: 11,
      userId: 12,
      review: `The blend of contemporary and mountain styles created a unique and breathtaking atmosphere. Every modern convenience was thoughtfully provided, making our stay comfortable and luxurious.`,
      stars: 5
    },
    {
      spotId: 11,
      userId: 1,
      review: `All the modern conveniences made it a seamless stay, and the views from the chalet were simply breathtaking. A true gem for anyone looking to escape and indulge in the beauty of Angel Fire.`,
      stars: 5
    },
    {
      spotId: 11,
      userId: 2,
      review: `Every modern convenience was provided, making our stay comfortable and convenient. From the moment we arrived, the beauty of Angel Fire Mountain surrounded us. A truly unforgettable and luxurious experience!`,
      stars: 5
    },
    {
      spotId: 12,
      userId: 1,
      review: `An absolutely beautiful place and property! I loved staying here and cannot wait to come back.`,
      stars: 5
    },
    {
      spotId: 12,
      userId: 2,
      review: `As a returning guest, Daniel’s house is always beautiful and stocked with everything you could need. The location is peaceful and private while feeling modern and fresh. You’ll never regret a stay here!`,
      stars: 5
    },
    {
      spotId: 12,
      userId: 3,
      review: `Hands down one of my favorite Airbnb destinations! The pictures are amazing and somehow they still don’t do the home justice. There’s so much to do at the house and the town is quaint and peaceful.`,
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {})
  }
};
