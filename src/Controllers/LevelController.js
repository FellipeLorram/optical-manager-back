import User from '../Models/UserModel';

class LevelController {
  async store(req, res) {
    const { adminPassword } = req.body;

    if (!adminPassword) return res.status(401).json({
      errors: ['Credenciais inválidas'],
    });

    const user = await User.findById(req.userId);

    if (user[0].adminPassword !== adminPassword) {
      return res.status(401).json({
        errors: ['Senha Inválida'],
      });
    }

    return res.json({
      level: 2,
      currentUserName: user[0].adminName,
    });
  }
}

export default new LevelController();
