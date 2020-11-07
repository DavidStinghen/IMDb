module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('movies', 'file_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    })
  },

  down: queryInterface => {
    return queryInterface.removeColumn('movies', 'file_id')
  }
}
