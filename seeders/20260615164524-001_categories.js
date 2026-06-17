'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Electronics',
        description: 'Electronic devices',
        image_url: 'electronics.jpg'
      },
      {
        name: 'Fashion',
        description: 'Fashion products',
        image_url: 'fashion.jpg'
      },
      {
        name: 'Books',
        description: 'Books category',
        image_url: 'books.jpg'
      },
      {
        name: 'Home Appliances',
        description: 'Home appliances',
        image_url: 'home.jpg'
      },
      {
        name: 'Sports',
        description: 'Sports products',
        image_url: 'sports.jpg'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};