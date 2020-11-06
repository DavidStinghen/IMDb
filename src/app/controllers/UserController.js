import * as Yup from 'yup'
import User from '../models/User'

class UserController {
  async store (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(8)
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Não foi possível realizar o cadastro, verifique os campos informados' })
    }

    const userEmailExists = await User.findOne({
      where: { email: req.body.email }
    })

    if (userEmailExists) {
      return res.status(400).json({ error: 'Não foi possível realizar o cadastro, já existe um usuário com o e-mail informado' })
    }

    const { id, name, email, provider } = await User.create(req.body)

    return res.json({ id, name, email, provider })
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8),
      password: Yup.string()
        .min(8)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      )
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Não foi possível atualizar os dados, verifique os campos informados' })
    }

    const user = await User.findByPk(req.userId)
    if (!user) {
      return res.status(404).json({ error: 'Não foi possível encontrar o usuário' })
    }

    const { email, oldPassword } = req.body
    if (email && email !== user.email) {
      const userEmailExists = await User.findOne({ where: { email } })

      if (userEmailExists) {
        return res.status(400).json({ error: 'Não foi possível atualizar os dados, já existe um usuário com o e-mail informado' })
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Não foi possível atualizar os dados, a senha informada não confere' })
    }

    await user.update(req.body)

    const { id, name } = await User.findByPk(req.userId)

    return res.json({ id, name, email })
  }

  async active (req, res) {
    const schema = Yup.object().shape({
      active: Yup.boolean().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Não foi possível atualizar o estado do usuário' })
    }

    const user = await User.findByPk(req.id)
    if (!user) {
      res.status(404).json({ error: 'Não foi possível encontrar o usuário' })
    }

    const { active } = req.body
    const { id, name, email } = user.update(req.body)

    return res.json({ id, name, email, active })
  }
}

export default new UserController()
