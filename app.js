// Global Variables:
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const tipRadio = document.getElementsByName("tip");
const tipCustom = document.getElementById("custom");
const numInput = document.querySelector("input[type='number']");
const tipPerPerson = document.getElementById("tip-per-person");
const totalPerPerson = document.getElementById("total-per-person");
const errorMsg = document.getElementById("error-msg");
const resetBtn = document.querySelector(".reset-btn");

// Initial Values:
let tipPercent = 0;

//Event handlers:
document.addEventListener("input", function () {
  calculateBill();
  validatePeople();
});
tipCustom.addEventListener("input", customInput);
// Removes "active" state of tip radio buttons when the custom input is clicked
tipCustom.addEventListener("click", clearRadios);
resetBtn.addEventListener("click", resetApp);
// Tip radio button event handler
for (let i = 0; i < tipRadio.length; i++) {
  tipRadio[i].addEventListener("click", calculateBill);
}

// Calculate the total bill and tip amount
function calculateBill() {
  let bill = billInput.value; //gets value of bill input
  let people = peopleInput.value; // gets value of number of people input

  // Get radio button tip value
  for (let i = 0; i < tipRadio.length; i++) {
    if (tipRadio[i].checked) {
      tipPercent = tipRadio[i].value;
    }
  }
  // Calculate tip amount per person
  let tipAmountPer = (bill * (tipPercent / 100)) / people;
  // Calculate total amount per person
  let billTotalPer = bill / people + tipAmountPer;
  //Update HTML:
  tipPerPerson.innerHTML = "$" + tipAmountPer.toFixed(2);
  totalPerPerson.innerHTML = "$" + billTotalPer.toFixed(2);
}

// Calculate custom tip value
function customInput() {
  let custom = tipCustom.value;
  if (custom !== "") {
    tipPercent = custom;
  } else {
    return tipPercent;
  }
}

// Clear the radio tip buttons
function clearRadios() {
  for (let i = 0; i < tipRadio.length; i++) {
    tipRadio[i].checked = false;
  }
}

// Validate the amount of people
function validatePeople() {
  if (peopleInput.value < 0) {
    errorMsg.innerHTML = "Can't be negative";
    errorMsg.style.display = "block";
    peopleInput.style.border = "2px solid hsl(0, 72%, 66%)";
    // Update HTML
    tipPerPerson.innerHTML = "$0.00";
    totalPerPerson.innerHTML = "$0.00";
  } else if (peopleInput.value == 0) {
    errorMsg.innerHTML = "Can't be zero";
    errorMsg.style.display = "block";
    peopleInput.style.border = "2px solid hsl(0, 72%, 66%)";
    // Update HTML
    tipPerPerson.innerHTML = "$0.00";
    totalPerPerson.innerHTML = "$0.00";
  } else {
    errorMsg.style.display = "none";
    peopleInput.style.border = "1px solid hsl(189, 41%, 97%)";
  }
}

//Reset button
numInput.addEventListener("input", (e) => {
  const value = e.target.value;
  if (value === "" || value == 0) {
    resetBtn.getAttribute("aria-disabled", "true");
    resetBtn.classList.remove("active");
  } else {
    resetBtn.getAttribute("aria-disabled", "false");
    resetBtn.classList.add("active");
  }
});

//Reset calculator
function resetApp() {
  billInput.value = 0;
  peopleInput.value = 0;
  clearRadios();
  tipCustom.value = "";
  tipPerPerson.innerHTML = "$0.00";
  totalPerPerson.innerHTML = "$0.00";
  resetBtn.getAttribute("aria-disabled", "true");
  resetBtn.classList.remove("active");
}
