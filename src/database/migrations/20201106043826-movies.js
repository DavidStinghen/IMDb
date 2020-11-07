module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movies', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      director: {
        type: Sequelize.STRING,
        allowNull: false
      },
      actors: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
      },
      genres: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
      },
      duration: {
        type: Sequelize.NUMERIC,
        allowNull: true
      },
      synopsis: {
        type: Sequelize.STRING,
        allowNull: true
      },
      release: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('movies')
  }
}
