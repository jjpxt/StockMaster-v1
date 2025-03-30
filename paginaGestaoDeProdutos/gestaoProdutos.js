const productForm = document.getElementById("productForm");
const productTableBody = document.querySelector("#productTable tbody");
const stockTableBody = document.querySelector("#stockTable tbody"); // Tabela do estoque

// Carrega produtos salvos no localStorage (se existirem)
let products = JSON.parse(localStorage.getItem("products")) || [];

// Função para salvar os produtos no localStorage
function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(products));
}

function goToHomePage() {
  window.location.href = "../index.html";
}

function deleteProduct(index) {
  products.splice(index, 1);
  saveToLocalStorage();
  renderProducts();
}

// Função para renderizar os produtos no cadastro
function renderProducts() {
  productTableBody.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");

    // Trunca textos longos para evitar quebra de layout
    const truncatedName = truncateText(product.name, 30);
    const truncatedCategory = truncateText(product.category, 20);
    const truncatedBrand = truncateText(product.brand, 20);
    const truncatedDetails = truncateText(product.details, 25);

    row.innerHTML = `
      <td title="${product.name}">${truncatedName}</td>
      <td title="${product.category}">${truncatedCategory}</td>
      <td title="${product.brand}">${truncatedBrand}</td>
      <td>${product.price.toFixed(2)}</td>
      <td title="${product.details}">${truncatedDetails}</td>
      <td>
        <div class="d-flex flex-wrap justify-content-center">
          <button class="edit btn btn-primary btn-sm m-1" onclick="editProduct(${index})">Editar</button>
          <button class="btn btn-danger btn-sm m-1" onclick="deleteProduct(${index})">Excluir</button>
        </div>
      </td>
    `;
    productTableBody.appendChild(row);
  });

  if (stockTableBody) {
    renderStock();
  }
}

// Função para truncar texto longo
function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

function renderStock() {
  stockTableBody.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");

    // Trunca textos longos para evitar quebra de layout
    const truncatedName = truncateText(product.name, 30);
    const truncatedCategory = truncateText(product.category, 20);
    const truncatedBrand = truncateText(product.brand, 20);

    row.innerHTML = `
      <td title="${product.name}">${truncatedName}</td>
      <td title="${product.category}">${truncatedCategory}</td>
      <td title="${product.brand}">${truncatedBrand}</td>
      <td>Lote ${index + 1}</td>
      <td>${generateRandomDate()}</td>
      <td>100</td>
    `;
    stockTableBody.appendChild(row);
  });
}

// Gerar uma data de validade aleatória (para demonstração)
function generateRandomDate() {
  const currentDate = new Date();
  const randomDays = Math.floor(Math.random() * 180) + 30; // Entre 30 e 180 dias
  const expiryDate = new Date(
    currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000
  );
  return expiryDate.toISOString().split("T")[0];
}

function addNewProductHandler(event) {
  event.preventDefault();

  const newProduct = {
    name: document.getElementById("productName").value,
    category: document.getElementById("productCategory").value,
    brand: document.getElementById("productBrand").value,
    price: parseFloat(document.getElementById("productPrice").value),
    details: document.getElementById("productDetails").value,
  };

  products.push(newProduct);
  saveToLocalStorage();
  renderProducts();
  productForm.reset();
}

function editProduct(index) {
  const product = products[index];

  document.getElementById("productName").value = product.name;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productBrand").value = product.brand;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productDetails").value = product.details;

  productForm.removeEventListener("submit", addNewProductHandler);

  function saveChangesHandler(event) {
    event.preventDefault();

    products[index] = {
      name: document.getElementById("productName").value,
      category: document.getElementById("productCategory").value,
      brand: document.getElementById("productBrand").value,
      price: parseFloat(document.getElementById("productPrice").value),
      details: document.getElementById("productDetails").value,
    };

    saveToLocalStorage();
    renderProducts();

    productForm.removeEventListener("submit", saveChangesHandler);
    productForm.addEventListener("submit", addNewProductHandler);
    productForm.reset();
  }

  productForm.addEventListener("submit", saveChangesHandler);
}

window.addEventListener("load", adjustTableForMobile);
window.addEventListener("resize", adjustTableForMobile);

function adjustTableForMobile() {
  const isMobile = window.innerWidth < 768;
  const table = document.getElementById("productTable");

  if (isMobile) {
    table.classList.add("table-sm");
  } else {
    table.classList.remove("table-sm");
  }
}

productForm.addEventListener("submit", addNewProductHandler);

renderProducts();
