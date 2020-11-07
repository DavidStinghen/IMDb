import * as Yup from 'yup'
import { Op } from 'sequelize'
import Movie from '../models/Movie'
import User from '../models/User'
import Rating from '../models/Rating'

class MovieController {
  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      director: Yup.string().required(),
      actors: Yup.string().required(),
      genres: Yup.string().required(),
      duration: Yup.number(),
      synopsis: Yup.string(),
      release: Yup.date()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Não foi possível realizar o cadastro, verifique os campos informados' })
    }

    const checkAdmin = await User.findOne({
      where: { id: req.userId, admin: true }
    })
    if (!checkAdmin) {
      return res.status(401).json({ error: 'Você não tem autorização para realizar cadastros de filmes' })
    }

    const movie = Movie.create(req.body)

    return res.json(movie)
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      director: Yup.string(),
      actors: Yup.string(),
      genres: Yup.string(),
      duration: Yup.number(),
      synopsis: Yup.string(),
      release: Yup.date()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Não foi possível realizar o atualização, verifique os campos informados' })
    }

    const checkAdmin = await User.findOne({
      where: { id: req.userId, admin: true }
    })
    if (!checkAdmin) {
      return res.status(401).json({ error: 'Você não tem autorização para realizar atualizar filmes' })
    }

    const { id } = req.params
    const movie = await Movie.findByPk(id)
    if (!movie) {
      return res.status(404).json({ error: 'Não foi possível encontrar o filme' })
    }

    await movie.update(req.body)

    return res.json(movie)
  }

  async index (req, res) {
    const { name, director, genres, actors } = req.query
    let movie = false
    if (name) {
      movie = await Movie.findAll({ where: { name: name } })
    } else if (director) {
      movie = await Movie.findAll({ where: { director: director } })
    } else if (genres) {
      movie = await Movie.findAll({ where: { genres: { [Op.contains]: [genres] } } })
    } else if (actors) {
      movie = await Movie.findAll({ where: { actors: { [Op.contains]: [actors] } } })
    } else {
      movie = await Movie.findAll()
    }

    if (!movie) {
      return res.status(404).json({ error: 'Não foram encontrados filmes' })
    }

    return res.json(movie)
  }

  async show (req, res) {
    const { id } = req.params

    const movie = await Movie.findByPk(id)
    if (!movie) {
      return res.status(404).json({ error: 'Não foi possível encontrar o filme' })
    }

    let finalRating = 0
    const rating = await Rating.findAll({
      where: { movie_id: id }
    })
    if (rating) {
      rating.forEach((register) => {
        finalRating += register.star
      })

      finalRating = finalRating / rating.length
    }

    return res.json({ movie: movie, rating: finalRating })
  }
}

export default new MovieController()
