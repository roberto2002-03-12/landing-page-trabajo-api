'use strict';
const { MensajeSchema, MENSAJE_TABLE } = require('../models/mensaje.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(MENSAJE_TABLE, 'created_at', MensajeSchema.createdAt)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
