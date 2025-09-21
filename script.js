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

  // Derived conversions
  const gramPerAna = gramPerVori / anaPerVori; // 0.729g
  const gramPerRoti = gramPerAna / rotiPerAna; // 0.1215g
  const gramPerPoint = gramPerRoti / pointPerRoti; // 0.01215g

  let remaining = goldWeight;

  // Breakdown without rounding error
  const totalVori = Math.floor(remaining / gramPerVori);
  remaining -= totalVori * gramPerVori;

  const totalAna = Math.floor(remaining / gramPerAna);
  remaining -= totalAna * gramPerAna;

  const totalRoti = Math.floor(remaining / gramPerRoti);
  remaining -= totalRoti * gramPerRoti;

  const totalPoint = Math.round(remaining / gramPerPoint);
  remaining -= totalPoint * gramPerPoint;

  // Carry system adjustment
  let adjVori = totalVori;
  let adjAna = totalAna;
  let adjRoti = totalRoti;
  let adjPoint = totalPoint;

  if (adjPoint >= pointPerRoti) {
    adjRoti += Math.floor(adjPoint / pointPerRoti);
    adjPoint = adjPoint % pointPerRoti;
  }
  if (adjRoti >= rotiPerAna) {
    adjAna += Math.floor(adjRoti / rotiPerAna);
    adjRoti = adjRoti % rotiPerAna;
  }
  if (adjAna >= anaPerVori) {
    adjVori += Math.floor(adjAna / anaPerVori);
    adjAna = adjAna % anaPerVori;
  }

  // Price calculations
  const voriPrice = (pricePerGram * gramPerVori).toFixed(2);
  const totalPrice = (pricePerGram * goldWeight).toFixed(2);

  // Deductions
  let deductions = "";
  for (let i = 20; i >= 1; i--) {
    const deductionAmount = ((i / 100) * totalPrice).toFixed(2);
    const priceAfterDeduction = (totalPrice - deductionAmount).toFixed(2);
    deductions += `<p><span class="bold">${i}% Deduction:</span> Tk ${deductionAmount} | Remaining: Tk ${priceAfterDeduction}</p>`;
  }

  // Display result
  const resultBox = document.getElementById("result");
  resultBox.innerHTML = `       
        <h3>Gold Details</h3>
        <p><span class="bold">Per Vori Gold Price:</span> Tk ${voriPrice}</p> 
        <p><span class="bold">Gold Quantity:</span> ${adjVori} Vori ${adjAna} Ana ${adjRoti} Roti ${adjPoint} Point</p>
        <p><span class="bold">Total Price:</span> Tk ${totalPrice}</p>
        <h3>Deduction</h3>
        ${deductions}
    `;
});

// Current year for footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
