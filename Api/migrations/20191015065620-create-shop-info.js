'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shopInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      product_price: {
        type: Sequelize.STRING
      },
      supply_price: {
        type: Sequelize.STRING
      },
      user_price: {
        type: Sequelize.STRING
      },
      summary_desc: {
        type: Sequelize.STRING
      },
      product_description: {
        type: Sequelize.STRING
      },
      miFileName: {
        type: Sequelize.STRING
      },
      aiFileName: {
        type: Sequelize.STRING
      },
      exhibition: {
        type: Sequelize.BOOLEAN
      },
      sale: {
        type: Sequelize.BOOLEAN
      },
      deliveryWay: {
        type: Sequelize.STRING
      },
      deliveryCost: {
        type: Sequelize.STRING
      },
      deliveryPrice: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shopInfos');
  }
};