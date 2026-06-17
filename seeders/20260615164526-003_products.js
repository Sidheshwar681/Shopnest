'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM categories;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const map = {};
    categories.forEach(c => {
      map[c.name] = c.id;
    });

    await queryInterface.bulkInsert('products', [
      {
        category_id: map['Electronics'],
        name: 'iPhone 16',
        description: 'Apple flagship smartphone',
        price: 89999,
        stock_quantity: 20,
        image_url: 'https://picsum.photos/200?iphone',
        is_active: true
      },
      {
        category_id: map['Electronics'],
        name: 'Samsung Galaxy S25',
        description: 'Samsung premium smartphone',
        price: 79999,
        stock_quantity: 15,
        image_url: 'https://picsum.photos/200?samsung',
        is_active: true
      },
      {
        category_id: map['Fashion'],
        name: 'Men Casual Shirt',
        description: 'Cotton casual shirt',
        price: 1499,
        stock_quantity: 50,
        image_url: 'https://picsum.photos/200?shirt',
        is_active: true
      },
      {
        category_id: map['Books'],
        name: 'Clean Code',
        description: 'Programming Book',
        price: 699,
        stock_quantity: 100,
        image_url: 'https://picsum.photos/200?book',
        is_active: true
      },
      {
        category_id: map['Sports'],
        name: 'Cricket Bat',
        description: 'Professional cricket bat',
        price: 2999,
        stock_quantity: 20,
        image_url: 'https://picsum.photos/200?cricket',
        is_active: true
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};