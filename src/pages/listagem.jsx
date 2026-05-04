import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

function Listagem() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultado = await api.getAll();
      setDados(Array.isArray(resultado) ? resultado : []);
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados');
      setDados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este item?')) {
      try {
        await api.delete(id);
        setDados(dados.filter(item => item.id !== id));
        alert('✅ Item deletado com sucesso!');
      } catch (err) {
        alert(`❌ Erro ao deletar: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  if (loading) return <p>⏳ Carregando...</p>;
  if (error) return <p>❌ {error}</p>;
  if (dados.length === 0) return <p>📭 Sem dados</p>;

  return (
    <div>
      <h2>Listagem de Dados</h2>
      <Link to="/cadastro">
        <button>+ Novo Cadastro</button>
      </Link>

      <ul>
        {dados.map((item) => (
          <li key={item.id}>
            <strong>{item.nomet}</strong> - {item.disciplina} ({item.professor})
            <Link to={`/edicao/${item.idt}`}>
              <button>Editar</button>
            </Link>
            <button onClick={() => handleDelete(item.idt)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listagem;