import { syncUserDataWithFirebase } from '@/services/firebase';
import { DataTypes } from 'sequelize';

import sequelize from '../../db';
import bcrypt from 'bcrypt';

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
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });

      await sequelize.sync();
      
      const hashedPassword = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({ email, password: hashedPassword });

      console.log('Novo usuário criado:', { email, password });

      await syncUserDataWithFirebase(createdUser);

      res.status(200).json({ message: 'Cadastro realizado com sucesso!' });

    } catch (error) {
      console.error('Erro ao criar conta:', error);
      res.status(500).json({ message: 'Ocorreu um erro ao criar a conta.' });
    }

  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}