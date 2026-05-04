const API_URL = "http://localhost:3000";

const api = {
  // GET - Listar todos os tópicos
  async getAll() {
    const response = await fetch(`${API_URL}/topicos`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ${response.status}: ${error}`);
    }
    return response.json();
  },

  // GET - Buscar tópico por ID
  async getById(id) {
    const response = await fetch(`${API_URL}/topicos/${id}`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ${response.status}: ${error}`);
    }
    return response.json();
  },

  // POST - Criar novo tópico
  async create(dados) {
    const response = await fetch(`${API_URL}/topicos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ${response.status}: ${error}`);
    }
    return response.json();
  },

  // PUT - Atualizar tópico
  async update(id, dados) {
    const response = await fetch(`${API_URL}/topicos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ${response.status}: ${error}`);
    }
    return response.json();
  },

  // DELETE - Deletar tópico
  async delete(id) {
    const response = await fetch(`${API_URL}/topicos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erro ${response.status}: ${error}`);
    }
    return response.json();
  },
};

export { api };
export default API_URL;
