// Produtos disponíveis no catálogo
const products = JSON.parse(localStorage.getItem("products")) || [];

const productList = document.getElementById("productList");
const cartTableBody = document.querySelector("#cartTable tbody");
const cartTotal = document.getElementById("cartTotal");

// Carrega ou inicializa o carrinho no localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Salvar o carrinho no localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCatalog() {
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "catalog-item";
    item.innerHTML = `
      <h3>${product.name}</h3>
      <p>Marca: ${product.brand}</p>
      <p>Preço: R$ ${product.price.toFixed(2)}</p>
      <button id="buttonJs" onclick="addToCart(${index})">Adicionar ao Carrinho</button>
    `;
    productList.appendChild(item);
  });
}

function addToCart(index) {
  const product = products[index];
  const existingItem = cart.find((item) => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.total += product.price;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      quantity: 1,
      total: product.price,
    });
  }

  saveCartToLocalStorage(); // Atualiza o localStorage
  renderCart();
}

// Renderizar o carrinho
function renderCart() {
  cartTableBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>R$ ${item.price.toFixed(2)}</td>
      <td>R$ ${item.total.toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remover</button>
      </td>
    `;
    cartTableBody.appendChild(row);
    total += item.total;
  });

  cartTotal.textContent = total.toFixed(2);
}

// Remover do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToLocalStorage(); // Atualiza o localStorage
  renderCart();
}

function goToCartPage() {
  window.location.href = "../paginaDoCarrinho/carrinho.html";
}

renderCatalog();
renderCart();

function goToDashboard() {
  window.location.href = "../index.html";
}
