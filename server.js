const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
 origin: ['https://ramon-nutri.netlify.app', 'http://localhost:5173']
}));

 app.use(express.json());

app.post('/mensagem', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Aqui vamos enviar por e-mail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ramon.lima777@gmail.com',
      pass: 'nyfl floz agce twda'
    }
  });

  const mailOptions = {
    from: email,
    to: 'ramon.lima777@gmail.com',
    subject: 'Nova mensagem do seu site',
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso!');
    res.status(200).json({ message: 'Mensagem enviada por e-mail!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Erro ao enviar e-mail' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
