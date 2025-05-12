import { useState, useEffect } from 'react';

const Home = () => {
  const [nome, setNome] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [message, setMessage] = useState('');

  // Função para buscar todos os usuários
  const listarUsuarios = async () => {
    const res = await fetch('/api/usuarios');
    const data = await res.json();
    setUsuarios(data);
  };

  // Função para criar um novo usuário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Usuário criado com sucesso!');
      listarUsuarios(); // Atualiza a lista de usuários
    } else {
      setMessage(data.error);
    }
  };

  useEffect(() => {
    listarUsuarios(); // Carrega a lista de usuários ao carregar a página
  }, []);

  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>

      <p>{message}</p>

      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map((usuario: any) => (
          <li key={usuario.UserID}>
            {usuario.UserID} - {usuario.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;