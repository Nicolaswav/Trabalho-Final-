const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "seu_usuario_mysql",
  password: "sua_senha_mysql",
  database: "nome_do_banco_de_dados",
});

// Rota para autenticação de usuário
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Consulta SQL para verificar credenciais
  const sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Erro ao consultar o banco de dados" });
      throw err;
    }

    if (result.length > 0) {
      // Usuário autenticado com sucesso
      res.status(200).json({ message: "Login bem-sucedido" });
    } else {
      // Credenciais inválidas
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  });
});

module.exports = router;
