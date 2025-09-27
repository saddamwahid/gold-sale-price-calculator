document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("goldCalculatorForm");
  const goldDetailsBox = document.getElementById("goldDetails");
  const deductionBox = document.getElementById("deductionBox");
  const toast = document.getElementById("toast");

  function showToast(message) {
    toast.textContent = message;
    toast.style.opacity = "1";
    setTimeout(() => {
      toast.style.opacity = "0";
    }, 1500);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const pricePerGram = parseFloat(
      document.getElementById("pricePerGram").value
    );
    const goldWeight = parseFloat(document.getElementById("goldWeight").value);

    if (isNaN(pricePerGram) || isNaN(goldWeight)) {
      alert("Please enter valid inputs.");
      return;
    }

    const gramPerVori = 11.664,
      anaPerVori = 16,
      rotiPerAna = 6,
      pointPerRoti = 10;
    const gramPerAna = gramPerVori / anaPerVori,
      gramPerRoti = gramPerAna / rotiPerAna,
      gramPerPoint = gramPerRoti / pointPerRoti;
    let remaining = goldWeight;
    const totalVori = Math.floor(remaining / gramPerVori);
    remaining -= totalVori * gramPerVori;
    const totalAna = Math.floor(remaining / gramPerAna);
    remaining -= totalAna * gramPerAna;
    const totalRoti = Math.floor(remaining / gramPerRoti);
    remaining -= totalRoti * gramPerRoti;
    const totalPoint = Math.round(remaining / gramPerPoint);

    const voriPrice = (pricePerGram * gramPerVori).toFixed(2);
    const totalPrice = (pricePerGram * goldWeight).toFixed(2);

    // Deductions
    let deductionsHTML = "";
    for (let i = 20; i >= 1; i--) {
      const deductionAmount = ((i / 100) * totalPrice).toFixed(2);
      const priceAfterDeduction = (totalPrice - deductionAmount).toFixed(2);
      deductionsHTML += `<p><strong>${i}% Deduction:</strong> Tk ${deductionAmount} | Remaining: Tk ${priceAfterDeduction}</p>`;
    }

    goldDetailsBox.innerHTML = `<h3 class="box-header">Gold Details</h3>
      <p><strong>Per Vori Gold Price:</strong> Tk ${voriPrice}</p>
      <p><strong>Gold Quantity:</strong> ${totalVori} Vori ${totalAna} Ana ${totalRoti} Roti ${totalPoint} Point</p>
      <p><strong>Total Price:</strong> Tk ${totalPrice}</p>`;
    goldDetailsBox.classList.add("show");

    deductionBox.innerHTML = `<h3 class="box-header">Deduction</h3>${deductionsHTML}`;
    deductionBox.classList.add("show");
  });

  // Copy on click
  function copyBoxContent(box, type) {
    const temp = document.createElement("textarea");
    temp.value = box.innerText;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
    if (type === "gold") {
      showToast("Copied to Gold Details!");
    } else if (type === "deduction") {
      showToast("Copied to Deduction!");
    }
  }

  goldDetailsBox.addEventListener("click", () =>
    copyBoxContent(goldDetailsBox, "gold")
  );
  deductionBox.addEventListener("click", () =>
    copyBoxContent(deductionBox, "deduction")
  );

  document.getElementById("currentYear").textContent = new Date().getFullYear();
});
