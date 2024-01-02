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
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-982917182292462192/original/28da9961-8536-4be0-8a79-db55d59b7633.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTgyOTE3MTgyMjkyNDYyMTky/original/c70013fa-d8c6-40b7-bbe9-936f8d4a3b02.jpeg?im_w=720',
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
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-708633038110930209/original/6b3a0c56-d133-4f41-96ad-da090cf0b738.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/122c418c-8aaf-4780-ae10-41a33b2b9d23.jpg?im_w=720',
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
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-808642972673698024/original/1d5e7a24-9e77-4c7f-aedc-73ee320aa366.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-808642972673698024/original/d4a4b0dc-f667-4067-a7a9-85f2777d52d0.jpeg?im_w=720',
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
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/7e23c5c3-61b1-4318-8dad-c6df902820ee.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/0698dc77-cfc5-4750-8c34-fa180455a848.jpg?im_w=720',
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
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/a139e2c7-bdd6-4f0a-b1ae-ad96572f7dd4.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/679b7338-8836-4e43-b30d-fb7ae5dc3b03.jpg?im_w=720',
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
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-651664918307295913/original/5350f08d-35d0-416b-a94f-6b49b96a84f6.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-651664918307295913/original/936132e9-1df7-450d-b5a1-06c97c2ba58b.jpeg?im_w=720',
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
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18850371/original/0cd2249d-fe3e-4c03-810a-4858dfddb478.png?im_w=720',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18850371/original/300e8dc1-076f-4faf-98fe-d6cc47b297e6.png?im_w=720',
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
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-48530677/original/6fcf8652-df3d-429b-8ad0-9f4839821cd0.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/airflow/Hosting-48530677/original/847edba5-2340-4f0c-b3d3-44f79250ff04.jpg?im_w=720',
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
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/557ce3fe-a11b-4a66-965d-491c4c973c02.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-984274338904473188/original/26b7bbe8-8c32-4b8f-8a59-62c82aa7f9f5.jpeg?im_w=720',
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
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-737936544393437558/original/63a2ebc6-9905-44c1-ba59-d04918dbc9c0.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-737936544393437558/original/608c1b8b-e21a-4bbb-91c9-698cc865739a.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-770279374259830778/original/cdcc2879-ffc8-40fb-bec8-3713bc06bf77.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-770279374259830778/original/8cb1a4f9-b007-42fd-9e02-63f86625a36a.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-770279374259830778/original/c831ca2c-82a5-4545-9035-d1b5e7881c9c.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-770279374259830778/original/0564556c-195d-48db-8c0e-eae5ee9175e0.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 11,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-770279374259830778/original/480e948b-7e41-46f2-8fd6-965f12cb4690.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-650923150746497725/original/fff3157c-3d15-4ece-bac8-d4022e3aea2d.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-650923150746497725/original/725e25e5-68d3-4062-b15e-0c143541e3f4.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-650923150746497725/original/6ebd3d11-eff9-4687-aaf9-63515f2202ad.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-650923150746497725/original/8e54f2cf-2039-4625-89d1-04864a52f6b3.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 12,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-650923150746497725/original/e13b8663-0b24-4cc1-aac8-be16276c53e3.jpeg?im_w=720',
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {})
  }
};
