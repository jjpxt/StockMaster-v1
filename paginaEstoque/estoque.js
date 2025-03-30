const stockTableBody = document.querySelector("#stockTable tbody");

// Carrega produtos do localStorage
let stockItems = JSON.parse(localStorage.getItem("products")) || [];

function renderStock() {
  stockTableBody.innerHTML = "";

  stockItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.brand}</td>
      <td>Lote ${index + 1}</td>
      <td>${item.validity || generateRandomDate()}</td>
      <td>${item.quantity || 100}</td>
    `;
    stockTableBody.appendChild(row);
  });

  // Atualiza o localStorage para salvar possíveis mudanças na validade ou quantidade
  localStorage.setItem("products", JSON.stringify(stockItems));
}

// Gerar uma data de validade aleatória
function generateRandomDate() {
  const currentDate = new Date();
  const randomDays = Math.floor(Math.random() * 180) + 30; // Entre 30 e 180 dias
  const expiryDate = new Date(
    currentDate.getTime() + randomDays * 24 * 60 * 60 * 1000
  );
  return expiryDate.toISOString().split("T")[0];
}

renderStock();

function goToDashboard() {
  window.location.href = "../index.html";
}
