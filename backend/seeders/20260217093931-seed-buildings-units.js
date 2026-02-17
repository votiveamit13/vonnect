'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      const transaction = await queryInterface.sequelize.transaction();

    try {

      const now = new Date();

      // ✅ Insert Buildings and RETURN ids
      const buildings = await queryInterface.bulkInsert(
        'buildings',
        [
          { name: 'Tower A', created_at: now, updated_at: now },
          { name: 'Tower B', created_at: now, updated_at: now },
          { name: 'Tower C', created_at: now, updated_at: now }
        ],
        { returning: true, transaction }
      );

      // PostgreSQL returns inserted rows with ids
      const units = [];

      buildings.forEach((b, index) => {

        units.push(
          {
            unit_number: `${b.name[6]}101`,
            floor: 1,
            square_meters: 75.50,
            building_id: b.id,
            created_at: now,
            updated_at: now
          },
          {
            unit_number: `${b.name[6]}201`,
            floor: 2,
            square_meters: 90.25,
            building_id: b.id,
            created_at: now,
            updated_at: now
          },
          {
            unit_number: `${b.name[6]}301`,
            floor: 3,
            square_meters: 120.75,
            building_id: b.id,
            created_at: now,
            updated_at: now
          }
        );

      });

      // ✅ Insert Units
      await queryInterface.bulkInsert(
        'units',
        units,
        { transaction }
      );

      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    
      const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.bulkDelete('units', null, { transaction });
      await queryInterface.bulkDelete('buildings', null, { transaction });

      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
