document.getElementById("calculateBtn").addEventListener("click", () => {
  const pricePerGram = parseFloat(
    document.getElementById("pricePerGram").value
  );
  const goldWeight = parseFloat(document.getElementById("goldWeight").value);

  if (isNaN(pricePerGram) || isNaN(goldWeight)) {
    alert("Please enter valid inputs.");
    return;
  }

  // Conversion constants
  const gramPerVori = 11.664;
  const anaPerVori = 16;
  const rotiPerAna = 6;
  const pointPerRoti = 10;

  const gramPerAna = gramPerVori / anaPerVori;
  const gramPerRoti = gramPerAna / rotiPerAna;
  const gramPerPoint = gramPerRoti / pointPerRoti;

  let remaining = goldWeight;

  const totalVori = Math.floor(remaining / gramPerVori);
  remaining -= totalVori * gramPerVori;

  const totalAna = Math.floor(remaining / gramPerAna);
  remaining -= totalAna * gramPerAna;

  const totalRoti = Math.floor(remaining / gramPerRoti);
  remaining -= totalRoti * gramPerRoti;

  const totalPoint = Math.round(remaining / gramPerPoint);

  // Price calculations
  const voriPrice = (pricePerGram * gramPerVori).toFixed(2);
  const totalPrice = (pricePerGram * goldWeight).toFixed(2);

  // Deductions
  let deductionsHTML = "";
  for (let i = 20; i >= 1; i--) {
    const deductionAmount = ((i / 100) * totalPrice).toFixed(2);
    const priceAfterDeduction = (totalPrice - deductionAmount).toFixed(2);
    deductionsHTML += `<p><span class="bold">${i}% Deduction:</span> Tk ${deductionAmount} | Remaining: Tk ${priceAfterDeduction}</p>`;
  }

  // Show Gold Details
  const goldDetails = document.getElementById("goldDetails");
  goldDetails.innerHTML = `
      <h3>Gold Details</h3>
      <p><span class="bold">Per Vori Gold Price:</span> Tk ${voriPrice}</p>
      <p><span class="bold">Gold Quantity:</span> ${totalVori} Vori ${totalAna} Ana ${totalRoti} Roti ${totalPoint} Point</p>
      <p><span class="bold">Total Price:</span> Tk ${totalPrice}</p>
  `;
  goldDetails.classList.add("show");

  // Show Deduction
  const deductionBox = document.getElementById("deductionBox");
  deductionBox.innerHTML = `<h3>Deduction</h3>${deductionsHTML}`;
  deductionBox.classList.add("show");
});

// Update footer year
document.getElementById("currentYear").textContent = new Date().getFullYear();
