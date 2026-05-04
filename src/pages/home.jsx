import { Link } from 'react-router-dom';
import '../App.css'; // ou importe seu CSS principal

function Home() {
  return (
    <div className="home-container">
      <h1>🏠 Sistema de Gerenciamento</h1>
      <p className="description">
        Bem-vindo ao sistema de CRUD completo com React, Vite e Fetch API.
      </p>

      <div className="menu">
        <Link to="/listagem" className="btn-primary">
          📋 Ver Listagem de Dados
        </Link>
        <Link to="/cadastro" className="btn-primary">
          ➕ Novo Cadastro
        </Link>
      </div>

      <div className="info">
        <h2>Funcionalidades implementadas:</h2>
        <ul>
          <li>✅ Tela inicial com menu</li>
          <li>✅ Listagem com GET</li>
          <li>✅ Cadastro com POST</li>
          <li>✅ Edição com PUT</li>
          <li>✅ Exclusão com DELETE</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;