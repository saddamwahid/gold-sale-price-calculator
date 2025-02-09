document.getElementById("calculateBtn").addEventListener("click", () => {
  const pricePerGram = parseFloat(
    document.getElementById("pricePerGram").value
  );
  const goldWeight = parseFloat(document.getElementById("goldWeight").value);

  if (isNaN(pricePerGram) || isNaN(goldWeight)) {
    alert("Please enter valid inputs.");
    return;
  }

  const gramPerVori = 11.664;
  const anaPerVori = 16;
  const rotiPerAna = 4;

  // Calculate 1 Vori price
  const voriPrice = (pricePerGram * gramPerVori).toFixed(2);

  // Calculate total gold in Vori, Ana, Roti
  const totalVori = Math.floor(goldWeight / gramPerVori);
  const remainingGrams = goldWeight % gramPerVori;
  const totalAna = Math.floor(remainingGrams / (gramPerVori / anaPerVori));
  const remainingAnaGrams = remainingGrams % (gramPerVori / anaPerVori);
  const totalRoti = Math.round(
    remainingAnaGrams / (gramPerVori / anaPerVori / rotiPerAna)
  );

  // Calculate total price before deduction
  const totalPrice = (pricePerGram * goldWeight).toFixed(2);

  // Calculate deductions and price after each deduction
  let deductions = "";
  for (let i = 20; i >= 1; i--) {
    const deductionAmount = ((i / 100) * totalPrice).toFixed(2);
    const priceAfterDeduction = (totalPrice - deductionAmount).toFixed(2);
    deductions += `<p><span class="bold">${i}% Deduction:</span> ৳${deductionAmount} | Remaining: ৳${priceAfterDeduction}</p>`;
  }

  // Display results
  const resultBox = document.getElementById("result");
  resultBox.innerHTML = `       
        <h3>Gold Details</h3>
        <p><span class="bold">Per Vori Gold Price:</span> ৳${voriPrice}</p> 
        <p><span class="bold">Gold Quantity:</span> ${totalVori} Vori ${totalAna} Ana ${totalRoti} Roti</p>
        <p><span class="bold">Total Price:</span> ৳${totalPrice}</p>
        <h3>Deduction</h3>
        ${deductions}
    `;
});

// Get the current year and update the footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
