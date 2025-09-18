// Mock Data
const requestsData = [
  {
    name: "John Doe",
    request: "Road Repair",
    department: "Infrastructure",
    status: "Pending",
  },
  {
    name: "Jane Smith",
    request: "Water Supply",
    department: "Utilities",
    status: "Completed",
  },
  {
    name: "Alice Johnson",
    request: "Street Light",
    department: "Infrastructure",
    status: "Pending",
  },
  {
    name: "Bob Brown",
    request: "Garbage Collection",
    department: "Sanitation",
    status: "Completed",
  },
  {
    name: "Charlie White",
    request: "Public Park Maintenance",
    department: "Recreation",
    status: "Pending",
  },
];

// Elements
const totalSpan = document.querySelector("#totalRequests span");
const pendingSpan = document.querySelector("#pendingRequests span");
const completedSpan = document.querySelector("#completedRequests span");
const tableBody = document.querySelector("#requestsTable tbody");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");

// Animated counter
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

// Update Summary
function updateSummary() {
  animateValue(totalSpan, 0, requestsData.length, 1000);
  animateValue(
    pendingSpan,
    0,
    requestsData.filter((r) => r.status === "Pending").length,
    1000
  );
  animateValue(
    completedSpan,
    0,
    requestsData.filter((r) => r.status === "Completed").length,
    1000
  );
}

// Populate Table
function populateTable(data) {
  tableBody.innerHTML = "";
  data.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.name}</td>
      <td>${r.request}</td>
      <td>${r.department}</td>
      <td><span class="status ${r.status}">${r.status}</span></td>
    `;
    tableBody.appendChild(tr);
  });
}

// Filter
function filterStatus(status) {
  if (status === "All") populateTable(requestsData);
  else populateTable(requestsData.filter((r) => r.status === status));
}

// Event listeners
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => filterStatus(btn.dataset.status));
});

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  populateTable(
    requestsData.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.request.toLowerCase().includes(term)
    )
  );
});

// Charts
function createCharts() {
  const ctxStatus = document.getElementById("statusChart").getContext("2d");
  new Chart(ctxStatus, {
    type: "doughnut",
    data: {
      labels: ["Pending", "Completed"],
      datasets: [
        {
          data: [
            requestsData.filter((r) => r.status === "Pending").length,
            requestsData.filter((r) => r.status === "Completed").length,
          ],
          backgroundColor: ["#f39c12", "#27ae60"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      cutout: "60%",
      animation: { animateScale: true, animateRotate: true },
    },
  });

  const departments = [...new Set(requestsData.map((r) => r.department))];
  const counts = departments.map(
    (d) => requestsData.filter((r) => r.department === d).length
  );
  const ctxDept = document.getElementById("departmentChart").getContext("2d");
  new Chart(ctxDept, {
    type: "bar",
    data: {
      labels: departments,
      datasets: [
        {
          label: "Requests per Department",
          data: counts,
          backgroundColor: "#6c63ff",
          borderRadius: 8,
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });
}

// Initialize
updateSummary();
populateTable(requestsData);
createCharts();
