// script.js

// Get a reference to the input element and the result cell
const ir1 = document.getElementById('input1');
const r1 = document.getElementById('result1');

// Function to calculate and update the result
function calculateResult() {
    const rarityValue = parseFloat(ir1.value);
    const calculatedValue = Math.floor(rarityValue * 0.5);
    r1.textContent = calculatedValue;
}

// Attach an event listener to the input element to update the result on input change
ir1.addEventListener('input', calculateResult);

// Calculate and display the initial result
calculateResult();
