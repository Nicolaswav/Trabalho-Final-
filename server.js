const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Configurar o CORS
app.use(cors());

// Middleware para analisar corpos de requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da conexão com o banco de dados MySQL usando pool de conexões
const db = mysql.createPool({
  connectionLimit: 10, // número máximo de conexões simultâneas
  host: "localhost",
  user: "root",
  password: "", // Coloque sua senha do MySQL aqui, se houver
  database: "database_name", // Substitua pelo nome do seu banco de dados
});

// Testar a conexão com o banco de dados
db.getConnection((err, connection) => {
  if (err) {
    throw err;
  }
  console.log("Conectado ao banco de dados MySQL");
  connection.release(); // liberar conexão
});

// Rota para autenticação de usuário
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Consulta SQL para verificar credenciais
  const sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err);
      return res
        .status(500)
        .json({ error: "Erro ao consultar o banco de dados" });
    }

    if (result.length > 0) {
      // Usuário autenticado com sucesso
      res
        .status(200)
        .json({ message: "Login bem-sucedido", username: result[0].username });
    } else {
      // Credenciais inválidas
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  });
});

// Rota para cadastrar um novo produto
app.post("/api/register", (req, res) => {
  const { nome, descricao, categoria, preco } = req.body;

  const sql =
    "INSERT INTO produtos (nome, descricao, categoria, preco) VALUES (?, ?, ?, ?)";
  db.query(sql, [nome, descricao, categoria, preco], (err, result) => {
    if (err) {
      console.error("Erro ao inserir produto no banco de dados:", err);
      return res
        .status(500)
        .json({ error: "Erro ao inserir produto no banco de dados" });
    }
    console.log("Produto cadastrado com sucesso");
    res.status(200).json({ message: "Produto cadastrado com sucesso" });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});
