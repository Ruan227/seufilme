import { DataTypes } from 'sequelize';
import { sign } from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import sequelize from '../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      await sequelize.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso!');

      const User = sequelize.define('User', {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });

      const user = await User.findOne({ where: { email } });

      if (!user) {
        res.status(401).json({ message: 'Confira Email tente novamente' });
        return;
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Confira Senha e tente novamente.' });
        return;
      }

      const token = sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });

      res.status(200).json({ message: 'Login realizado com sucesso!', token });

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Ocorreu um erro ao fazer login.' });
    }

  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}