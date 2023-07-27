// Function to unlock the payment options and display the payment steps
function unlockPaymentOptions() {
    const paymentOptions = document.getElementById('payment-options');
    const paymentSteps = document.getElementById('payment-steps');
    const networkDropdown = document.getElementById('network-dropdown');
    const selectedNetwork = networkDropdown.value;

    if (selectedNetwork === '') {
        alert('Please select your preferred payment network.');
        return;
    }

    paymentOptions.style.display = 'none';

    // Render the appropriate payment steps based on the user's preferred network
    renderPaymentSteps(selectedNetwork);
}

// Function to render the appropriate payment steps based on the user's preferred network
function renderPaymentSteps(preferredNetwork) {
    const paymentStepsContainer = document.getElementById('payment-steps');
    const changeNetworkButton = document.getElementById('change-network');

    paymentStepsContainer.innerHTML = '';

    // Define the steps for each payment network
    const paymentSteps = {
        mtn: [
            "Dial *170# on your phone.",
            "Choose option 1 (Transfer Money)",
            "Choose option 1 for MoMo user",
            "Enter and confirm the recipient’s mobile number",
            "Enter the amount you want to send",
            "Enter a reference code",
            "Enter your 4-digit mobile money PIN code to proceed",
            "Enter 1 to confirm",
            "You will receive a confirmatory SMS after a successful transaction",
            "I hope this helps!",
            "Dial 100 if you have any other questions",
        ],
        vodafone: [
          "Dial the Vodafone Cash short code *110# on your phone",
          "Choose the Send Money option.",
          "Select Other Networks",
          "Choose the Network of the Recipient – MTN",
          "Enter the phone number of the recipient",
          "024-XXX-XXXX",
          "State the amount you prefer to send",
          "Confirm transaction details",
          "Authorize the transaction by entering your Vodafone Cash pin",
          "I hope this helps! "
        ],
        airteltigo: [
            "Dial the AirtelTigo Money short code: *110#",
            "Choose ‘Send Money’ on Airtel or ‘Buy and Send’ on Tigo (Other Networks)",
            "Select To Mobile Number",
            "Choose the Network of the Recipient – MTN",
            "Enter the phone number of the recipient",
            "024-XXX-XXXX",
            "State the amount you prefer to send",
            "Confirm transaction details",
            "Authorize the transaction by entering your AirtelTigo Money pin."
        ],
        ghanapay: [
            "Dial *707# on your phone",
            "Choose the option to send money",
            "Select the recipient’s network (MTN)",
            "Enter the recipient’s phone number",
            "024-XXX-XXXX",
            "Enter the amount you want to send",
            "Confirm the transaction details",
            "Enter your GhanaPay PIN to authorize the transaction."
        ],
        // more payment steps for other networks will be added as needed
    };

    // Render the selected payment steps
    const steps = paymentSteps[preferredNetwork];
    steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.classList.add('step');
        stepElement.textContent = step;

        const stepNumber = document.createElement('span');
        stepNumber.classList.add('step-number');
        stepNumber.textContent = `Step ${index + 1}`;

        stepElement.insertBefore(stepNumber, stepElement.firstChild);
        paymentStepsContainer.appendChild(stepElement);
    });

    changeNetworkButton.style.display = 'block';
    paymentStepsContainer.style.display = 'block';
}

// Function to go back to payment options
function goBackToOptions() {
    const paymentOptions = document.getElementById('payment-options');
    const paymentSteps = document.getElementById('payment-steps');
    const changeNetworkButton = document.getElementById('change-network');

    paymentSteps.innerHTML = '';
    changeNetworkButton.style.display = 'none';
    paymentSteps.style.display = 'none';
    paymentOptions.style.display = 'block';
}
// Function to show the payment success message
function showPaymentSuccessMessage() {
    const paymentSuccessMessage = document.getElementById('payment-success-message');
    paymentSuccessMessage.style.display = 'block';
}

// Main function to handle the payment process
document.addEventListener('DOMContentLoaded', function() {
    const networkDropdown = document.getElementById('network-dropdown');
    networkDropdown.addEventListener('change', unlockPaymentOptions);

    const changeNetworkButton = document.getElementById('change-network');
    changeNetworkButton.style.display = 'none';
});
