require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// CORS - Permitir requisições do frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ============================================================
// ROTAS
// ============================================================

// Tópicos
const topicosRoutes = require('./src/routes/topicosroute');
app.use('/topicos', topicosRoutes);

// Questões
const questoesRoutes = require('./src/routes/questoesroute');
app.use('/questoes', questoesRoutes);

// ============================================================
// ROTA RAIZ
// ============================================================

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Tópicos e Questões com PostgreSQL',
    versao: '1.0',
    ambiente: process.env.NODE_ENV || 'development',
    banco: 'PostgreSQL',
    endpoints: {
      topicos: '/topicos',
      questoes: '/questoes'
    }
  });
});

// ============================================================
// INICIAR SERVIDOR
// ============================================================

app.listen(PORT, () => {
  console.log('='.repeat(70));
  console.log('🚀 Servidor rodando com sucesso!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📌 Endpoints disponíveis:');
  console.log('      Tópicos: /topicos');
  console.log('      Questões: /questoes');
  console.log('='.repeat(70));
});