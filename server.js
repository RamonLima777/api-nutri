const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Permitir requisições do frontend
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rapture7*',
  database: 'nutricao'
});

// Conectar no banco
db.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar no MySQL:', err);
  } else {
    console.log('🟢 Conectado ao MySQL!');
  }
});

// Rota para receber dados do formulário
app.post('/enviar-mensagem', (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;

  const sql = 'INSERT INTO contatos (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, email, telefone, mensagem], (err, result) => {
    if (err) {
      console.error('❌ Erro ao inserir:', err);
      res.status(500).json({ error: 'Erro ao salvar no banco.' });
    } else {
      res.status(200).json({ message: 'Mensagem salva com sucesso!' });
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
