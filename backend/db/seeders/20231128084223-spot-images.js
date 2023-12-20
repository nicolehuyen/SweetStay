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
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-982917182292462192/original/62a8d23d-4ae7-422a-b5ff-b54097b893e1.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-982917182292462192/original/43746c52-9f07-41c7-9414-a6291146be90.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTgyOTE3MTgyMjkyNDYyMTky/original/c09667b6-28c7-485c-972c-0c7aad66d0d5.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-708633038110930209/original/4219fd9a-0364-4257-a11b-e4fdfbd1a3de.jpeg?im_w=960',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-708633038110930209/original/aba4de41-2c5a-4740-b499-78c99ac9462d.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-708633038110930209/original/e42cd0bf-acea-4496-ac54-73af5cb81436.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-808642972673698024/original/e3aee777-4611-4e91-86ce-3bb7c835e923.jpeg?im_w=960',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-808642972673698024/original/d3e965b8-55c4-4d6e-aa7c-aaa3f342525f.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-808642972673698024/original/d28185cd-58cd-4b54-88bc-4e9c30ef528d.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/7c2f50b3-1d18-4476-9710-b3d5516179a8.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/b4a6ddb2-d7f0-4a7f-975f-1f7cb4bce2de.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/8a0705ea-68db-4c40-816a-bb5762cf9a02.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/a3449710-b3fd-417e-83f4-2128c1bbc379.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/13ba6a0f-5392-44b6-94d6-3fc64c972434.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/98bc34c3-3689-498a-a952-07199cd9ecf6.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53688804/original/0ee4607b-cc69-48bf-8acb-353ef8810eff.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-651664918307295913/original/add66c01-9fd8-44cf-b017-ddd68d36dc72.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-651664918307295913/original/0e7caa19-470f-49f8-9aa1-76c159103ea4.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18850371/original/2823af60-a03b-476b-88fe-7ff4d5dc6215.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/7c1bd846-e0cd-4ebf-b5fd-0b4fd6dfca6e.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18850371/original/e5805318-b004-40a6-bd07-5e38f420ad39.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-48530677/original/6aa67bee-a127-4899-b069-e79151ff4d51.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-48530677/original/2376ac50-f30c-46ae-9d9f-22ba15847158.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-48530677/original/1f9d8fce-5bf8-44a8-b074-b320e82dc4f5.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-984274338904473188/original/41afe7ba-9f22-416c-a168-1a19ccbfcf15.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-984274338904473188/original/dc850ddf-64f2-4f6f-acc3-69cd87cddd65.jpeg?im_w=960',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-984274338904473188/original/c3bddef6-db5c-45dc-943c-7f14e65adfed.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-737936544393437558/original/fdb9d6ef-4719-4285-acff-a0178a52c93e.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-737936544393437558/original/3d5da25d-c65d-42d0-b39f-cef2cb689c3a.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-737936544393437558/original/cf892f4a-0dfc-428d-873a-b0fba3c03adc.jpeg?im_w=1200',
      preview: true
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
