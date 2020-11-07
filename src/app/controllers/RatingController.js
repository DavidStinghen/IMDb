import * as Yup from 'yup'
import Rating from '../models/Rating'
import Movie from '../models/Movie'
import User from '../models/User'

class RatingController {
  async store (req, res) {
    const schema = Yup.object().shape({
      star: Yup.number().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Não foi possível realizar o cadastro, verifique os campos informados' })
    }

    const checkAdmin = await User.findOne({
      where: { id: req.userId, admin: true }
    })
    if (checkAdmin) {
      return res.status(401).json({ error: 'Você não tem autorização para avaliar um filme' })
    }

    const { movieId } = req.params
    const movie = Movie.findByPk(movieId)
    if (!movie) {
      return res.status(404).json({ error: 'Filme não encontrado' })
    }

    const hasRating = await Rating.findOne({
      where: { user_id: req.userId, movie_id: movieId }
    })
    if (hasRating) {
      return res.status(401).json({ error: 'Você já realizou uma avaliação para esse filme' })
    }

    const rating = await Rating.create(
      {
        star: req.body.star,
        user_id: req.userId,
        movie_id: movieId
      }
    )

    return res.json(rating)
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      star: Yup.number().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Não foi possível realizar a atualização, verifique os campos informados' })
    }

    const checkAdmin = await User.findOne({
      where: { id: req.userId, admin: true }
    })
    if (checkAdmin) {
      return res.status(401).json({ error: 'Você não tem autorização para alterar a avaliação de um filme' })
    }

    const { movieId } = req.params
    const rating = await Rating.findOne({
      where: { user_id: req.userId, movie_id: movieId }
    })
    if (!rating) {
      return res.status(404).json({ error: 'Não existe avaliação para o filme' })
    }

    await rating.update(req.body)

    return res.json(rating)
  }
}

export default new RatingController()
