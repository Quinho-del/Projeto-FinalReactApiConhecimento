import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function Edicao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idt: '',
    nomet: '',
    disciplina: '',
    professor: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const carregarItem = async () => {
      try {
        const item = await api.getById(id);
        setFormData({
          idt: item.idt || '',
          nomet: item.nomet || '',
          disciplina: item.disciplina || '',
          professor: item.professor || '',
        });
      } catch (err) {
        setMessage({ type: 'error', text: 'Erro ao carregar o item para edição.' });
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    carregarItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      await api.update(id, formData);
      setMessage({ type: 'success', text: '✅ Dados atualizados com sucesso!' });
      
      setTimeout(() => {
        navigate('/listagem');
      }, 1500);
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Erro ao atualizar os dados.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">⏳ Carregando dados...</div>;

  return (
    <div className="edicao-container">
      <h1>✏️ Edição de Item</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID do Tópico</label>
          <input
            type="number"
            name="idt"
            value={formData.idt}
            readOnly
            style={{ backgroundColor: '#f5f5f5' }}
          />
        </div>

        <div className="form-group">
          <label>Nome do Tópico *</label>
          <input
            type="text"
            name="nomet"
            value={formData.nomet}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Disciplina *</label>
          <input
            type="text"
            name="disciplina"
            value={formData.disciplina}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Professor *</label>
          <input
            type="text"
            name="professor"
            value={formData.professor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="buttons">
          <button 
            type="button" 
            onClick={() => navigate('/listagem')}
            className="btn-cancel"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={saving}
            className="btn-success"
          >
            {saving ? 'Salvando...' : 'Atualizar'}
          </button>
        </div>
      </form>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default Edicao;