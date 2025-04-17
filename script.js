document.addEventListener('DOMContentLoaded', function () {
  const emiModal = new bootstrap.Modal(document.getElementById('emi-modal'));

  // Open EMI modal on click
  document.getElementById('emi-calculator-btn').addEventListener('click', function () {
    emiModal.show();
  });

  // Update range displays
  const loanAmountInput = document.getElementById('loan-amount');
  const interestRateInput = document.getElementById('interest-rate');
  const loanTenureInput = document.getElementById('loan-tenure');

  loanAmountInput.addEventListener('input', () => {
    document.getElementById('loan-amount-display').textContent = '₹' + loanAmountInput.value;
  });

  interestRateInput.addEventListener('input', () => {
    document.getElementById('interest-rate-display').textContent = interestRateInput.value + '%';
  });

  loanTenureInput.addEventListener('input', () => {
    document.getElementById('loan-tenure-display').textContent = loanTenureInput.value + ' years';
  });

  // EMI Calculation
  document.getElementById('calculate-emi').addEventListener('click', function () {
    const loanAmount = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value);
    const loanTenure = parseInt(loanTenureInput.value);

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTenure)) {
      alert("Please enter valid values.");
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const months = loanTenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);

    document.getElementById('emi-value').textContent = emi.toFixed(2);
    document.getElementById('emi-result').style.display = 'block';
  });

  // Close event listener for when modal is closed
  document.getElementById('emi-modal').addEventListener('hidden.bs.modal', function () {
    // You can perform any other tasks here, for now, nothing is needed
    // This ensures that the page doesn't need to reload and the user stays on the page
    console.log('EMI Calculator modal has been closed.');
  });
});

