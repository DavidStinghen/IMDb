import File from '../models/File'
import User from '../models/User'

class FileController {
  async store (req, res) {
    const { originalname: name, filename: path } = req.file

    const checkAdmin = await User.findOne({
      where: { id: req.userId, admin: true }
    })
    if (!checkAdmin) {
      return res.status(401).json({ error: 'Você não tem autorização para realizar uploads de arquivos' })
    }

    const file = await File.create({ name, path })

    return res.json(file)
  }
}

export default new FileController()
