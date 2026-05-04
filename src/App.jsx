// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Listagem from './pages/listagem';
import Cadastro from './pages/cadastro';
import Edicao from './pages/edicao';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listagem" element={<Listagem />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/edicao/:id" element={<Edicao />} />
      </Routes>
    </Router>
  );
}

export default App;