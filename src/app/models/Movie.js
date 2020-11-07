import Sequelize, { Model } from 'sequelize'

class Movie extends Model {
  static init (sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        director: Sequelize.STRING,
        actors: Sequelize.ARRAY(Sequelize.TEXT),
        genres: Sequelize.ARRAY(Sequelize.TEXT),
        duration: Sequelize.NUMBER,
        synopsis: Sequelize.STRING,
        release: Sequelize.DATE
      },
      {
        sequelize
      }
    )

    return this
  }

  static associate (models) {
    this.belongsTo(models.File, { foreignKey: 'file_id', as: 'file' })
  }
}

export default Movie
