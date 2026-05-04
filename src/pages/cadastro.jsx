import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function Cadastro() {
  const [form, setForm] = useState({ nomet: '', disciplina: '', professor: '' });
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nomet.trim() || !form.disciplina.trim() || !form.professor.trim()) {
      setMensagem('❌ Todos os campos são obrigatórios');
      return;
    }

    try {
      await api.create(form);
      setMensagem('✅ Cadastrado com sucesso!');
      setTimeout(() => navigate('/listagem'), 1500);
    } catch (error) {
      setMensagem(`❌ Erro: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nomet"
          placeholder="Nome do Tópico"
          value={form.nomet}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="disciplina"
          placeholder="Disciplina"
          value={form.disciplina}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="professor"
          placeholder="Professor"
          value={form.professor}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Cadastro;