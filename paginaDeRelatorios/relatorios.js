function renderCharts() {
  // Configuração do Gráfico de Vendas
  const salesCtx = document.getElementById("salesChart").getContext("2d");
  new Chart(salesCtx, {
    type: "line",
    data: {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
      datasets: [
        {
          label: "Vendas Mensais (R$)",
          data: [5000, 7000, 8000, 10000, 5700],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  });

  // Configuração do Gráfico de Produtos Próximos à Validade
  const expiryCtx = document.getElementById("expiryChart").getContext("2d");
  new Chart(expiryCtx, {
    type: "bar",
    data: {
      labels: ["Produto 1", "Produto 2", "Produto 3", "Produto 4"],
      datasets: [
        {
          label: "Quantidade Próxima à Validade",
          data: [15, 10, 25, 30],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  });
}

// Função para navegar ao Dashboard
function goToDashboard() {
  window.location.href = "../dashboard/dashboard.html"; // Ajuste o caminho conforme necessário
}

// Renderizar os gráficos
renderCharts();
