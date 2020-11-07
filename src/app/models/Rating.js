import Sequelize, { Model } from 'sequelize'

class Rating extends Model {
  static init (sequelize) {
    super.init(
      {
        user_id: Sequelize.NUMBER,
        movie_id: Sequelize.NUMBER,
        star: Sequelize.NUMBER
      },
      {
        sequelize
      }
    )

    return this
  }

  static associate (models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', targetKey: 'id' })
    this.belongsTo(models.Movie, { as: 'movie', foreignKey: 'movie_id', targetKey: 'id' })
  }
}

export default Rating
