'use strict';
const { FORMULARIO_RECLAMO_TABLE, FormularioReclamoSchema } = require('../models/formulario-reclamo.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(FORMULARIO_RECLAMO_TABLE, FormularioReclamoSchema);
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
