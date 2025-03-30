// Seleciona elementos da página
const cartTableBody = document.querySelector("#cartTable tbody");
const cartTotal = document.getElementById("cartTotal");

// Carrega os itens do carrinho salvos no localStorage (se existirem)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Função para renderizar os itens do carrinho
function renderCart() {
  cartTableBody.innerHTML = ""; // Limpa a tabela
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>R$ ${item.price.toFixed(2)}</td>
      <td>R$ ${(item.quantity * item.price).toFixed(2)}</td>
      <td>
        <button id="rmvBtn" onclick="removeFromCart(${index})">Remover</button>
      </td>
    `;
    cartTableBody.appendChild(row);
    total += item.quantity * item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Função para remover itens do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); // Atualiza o localStorage
  renderCart();
}

// Função para finalizar o pedido
// document.getElementById("finalizeOrder").addEventListener("click", () => {
//   alert("Pedido finalizado com sucesso!");
//   cart = []; // Limpa o carrinho
//   localStorage.setItem("cart", JSON.stringify(cart)); // Atualiza o localStorage
//   renderCart();
// });

// Função para voltar ao Dashboard
function goToDashboard() {
  window.location.href = "../dashboard/dashboard.html"; // Ajuste o caminho conforme necessário
}

// Renderiza o carrinho ao carregar a página
renderCart();
