import jwt from 'jsonwebtoken';
import User from '../Models/UserModel';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) return res.status(401).json({
      errors: ['Credenciais inválidas'],
    });

    const user = await User.findByEmail(email);

    if (!user.length) {
      return res.status(401).json({
        errors: ['Usuario nao existe'],
      });
    }

    if (password !== user[0].password) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { id } = user[0];

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { nome: user[0].nome, id: user[0]._id, email: user[0].email } });
  }
}

export default new TokenController();
