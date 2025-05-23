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

//Slide show
let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    // Remove animation class in case it was already applied
    slides[i].classList.remove("slide-in");
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  let currentSlide = slides[slideIndex - 1];
  currentSlide.style.display = "block";

  // Trigger the slide-in animation
  void currentSlide.offsetWidth; // Force reflow to restart animation
  currentSlide.classList.add("slide-in");

  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

showSlides();


document.getElementById("loanForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = this;
  const formData = {
    "Full Name": form["Full Name"].value,
    "Age": form["Age"].value,
    "Mobile Number": form["Mobile Number"].value,
    "Email": form["Email"].value,
    "Profession": form["Profession"].value,
    "Loan Type": form["Loan Type"].value,
    "Required Loan Amount": form["Required Loan Amount"].value,
    "District": form["District"].value,
    "Pincode": form["Pincode"].value
  };

  fetch("https://script.google.com/macros/s/AKfycbx0Pcz16GlDmgqpJxTNygZP9GtaJ4knZxfAXg3dRtU3VheTpFfiYsj_e9MQnsoUpruq-Q/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.text())
  .then(data => {
    alert(data === "Success" ? "Form submitted successfully!" : data);
    form.reset();
  })
  .catch(error => {
    alert("There was an error submitting the form.");
    console.error("Error:", error);
  });
});

