document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar o comportamento padrão de submissão do formulário

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const categoria = document.getElementById("categoria").value;
    const preco = document.getElementById("preco").value;

    cadastrarProduto(nome, descricao, categoria, preco);
  });

async function cadastrarProduto(nome, descricao, categoria, preco) {
  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, descricao, categoria, preco }),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar produto");
    }

    const data = await response.json();
    alert("Produto cadastrado com sucesso!");
    window.location.href = "/list_product.html"; // Redireciona para a página de lista de produtos
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao cadastrar produto. Por favor, tente novamente mais tarde.");
  }
}
