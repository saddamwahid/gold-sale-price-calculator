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

  // Calculate Vori → Ana → Roti → Point
  let totalVori = Math.floor(goldWeight / gramPerVori);
  let remainingGrams = goldWeight % gramPerVori;

  let totalAna = Math.floor(remainingGrams / gramPerAna);
  remainingGrams = remainingGrams % gramPerAna;

  let totalRoti = Math.floor(remainingGrams / gramPerRoti);
  remainingGrams = remainingGrams % gramPerRoti;

  let totalPoint = Math.round(remainingGrams / gramPerPoint);

  // Carry system
  if (totalPoint >= pointPerRoti) {
    totalRoti += Math.floor(totalPoint / pointPerRoti);
    totalPoint = totalPoint % pointPerRoti;
  }

  if (totalRoti >= rotiPerAna) {
    totalAna += Math.floor(totalRoti / rotiPerAna);
    totalRoti = totalRoti % rotiPerAna;
  }

  if (totalAna >= anaPerVori) {
    totalVori += Math.floor(totalAna / anaPerVori);
    totalAna = totalAna % anaPerVori;
  }

  // Price calculation
  const voriPrice = (pricePerGram * gramPerVori).toFixed(2);
  const totalPrice = (pricePerGram * goldWeight).toFixed(2);

  // Deductions
  let deductionsHTML = "";
  for (let i = 20; i >= 1; i--) {
    const deductionAmount = ((i / 100) * totalPrice).toFixed(2);
    const remainingPrice = (totalPrice - deductionAmount).toFixed(2);
    deductionsHTML += `<p><span class="bold">${i}% Deduction:</span> Tk ${deductionAmount} | Remaining: Tk ${remainingPrice}</p>`;
  }

  // Display Gold Details
  const goldDetailsBox = document.getElementById("goldDetails");
  goldDetailsBox.innerHTML = `
        <h3>Gold Details</h3>
        <p><span class="bold">Per Vori Price:</span> Tk ${voriPrice}</p>
        <p><span class="bold">Gold Quantity:</span> ${totalVori} Vori ${totalAna} Ana ${totalRoti} Roti ${totalPoint} Point</p>
        <p><span class="bold">Total Price:</span> Tk ${totalPrice}</p>
    `;
  goldDetailsBox.classList.add("show");

  // Display Deduction Box
  const deductionBox = document.getElementById("deductionBox");
  deductionBox.innerHTML = `<h3>Deduction</h3>${deductionsHTML}`;
  deductionBox.classList.add("show");
});

// Footer current year
document.getElementById("currentYear").textContent = new Date().getFullYear();
