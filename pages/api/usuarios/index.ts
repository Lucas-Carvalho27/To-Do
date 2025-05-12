// pages/api/usuarios/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../../lib/db';

// Função para listar os usuários (GET)
const listarUsuarios = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [usuarios] = await pool.execute('SELECT * FROM User');
    res.status(200).json(usuarios);  // Retorna os usuários como resposta JSON
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
};

// Função para criar um usuário (POST)
const criarUsuario = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nome } = req.body;  // Recebe o nome via body

  if (!nome) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }

  try {
    // O UserID é gerado automaticamente pelo banco devido ao AUTO_INCREMENT
    const [result] = await pool.execute(
      'INSERT INTO User (name) VALUES (?)',
      [nome]
    );

    res.status(201).json({ message: 'Usuário criado com sucesso'});
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

// Exporta a função para lidar com as requisições
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return listarUsuarios(req, res);  // Lidar com GET
  } else if (req.method === 'POST') {
    return criarUsuario(req, res);  // Lidar com POST
  } else {
    res.status(405).json({ error: 'Método não permitido' });  // Métodos não suportados
  }
};