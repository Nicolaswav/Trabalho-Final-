// js/login.js

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Credenciais inválidas");
        }
        return response.json();
      })
      .then((data) => {
        // Login bem-sucedido, redirecionar para outra página e exibir mensagem
        window.location.href = "dashboard.html"; // Redireciona para a página de produtos
        showWelcomeMessage(username); // Exibe mensagem de boas-vindas com o nome do usuário
      })
      .catch((error) => {
        // Exibir mensagem de erro
        showError(error.message);
      });
  });

function showError(message) {
  const errorElement = document.getElementById("error");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function showWelcomeMessage(username) {
  const welcomeElement = document.getElementById("error"); // Elemento onde você quer exibir a mensagem de boas-vindas
  welcomeElement.textContent = `Seja bem-vindo, ${username}!`;
  welcomeElement.style.color = "green";
  welcomeElement.style.display = "block";
}
