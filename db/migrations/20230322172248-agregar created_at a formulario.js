'use strict';
const { FORMULARIO_RECLAMO_TABLE, FormularioReclamoSchema } = require('../models/formulario-reclamo.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(FORMULARIO_RECLAMO_TABLE, 'created_at', FormularioReclamoSchema.createdAt);
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
