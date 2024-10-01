// document.addEventListener('DOMContentLoaded', function() {

//     // Get the popup and close button elements
//     const popupForm = document.getElementById('popupForm');
//     const openPopupButton = document.getElementById('openPopup');
//     const closePopupButton = document.getElementById('closePopup');

//     // When the user clicks the "Request Free Consultation" button, show the popup
//     openPopupButton.addEventListener('click', function() {
//         popupForm.style.display = 'flex'; // Show the popup with flexbox
//     });

//     // When the user clicks the close button (×), close the popup
//     closePopupButton.addEventListener('click', function() {
//         popupForm.style.display = 'none'; // Hide the popup
//     });

//     // Close the popup if the user clicks outside of the form content
//     window.addEventListener('click', function(event) {
//         if (event.target === popupForm) {
//             popupForm.style.display = 'none';
//         }
//     });
// });



document.addEventListener('DOMContentLoaded', function () {
    // Get the popup and close button elements
    const popupForm = document.getElementById('popupForm');
    const openPopupButtons = document.querySelectorAll('#openPopup, #openPopupButton');
    const closePopupButton = document.getElementById('closePopup');

    // Function to open the popup
    function openPopup() {
        popupForm.style.display = 'flex'; // Show the popup with flexbox
    }

    // Add event listeners to all elements that should open the popup
    openPopupButtons.forEach(function (button) {
        button.addEventListener('click', openPopup);
    });

    // When the user clicks the close button (×), close the popup
    closePopupButton.addEventListener('click', function () {
        popupForm.style.display = 'none'; // Hide the popup
    });

    // Close the popup if the user clicks outside of the form content
    window.addEventListener('click', function (event) {
        if (event.target === popupForm) {
            popupForm.style.display = 'none';
        }
    });
});

function calculateStampDuty() {
    const price = parseFloat(document.getElementById('price').value);
    const isFirstTimeBuyer = document.getElementById('firstTimeBuyer').checked;
    const isBuyToLet = document.getElementById('buyToLet').checked;
    const isNonUKResident = document.getElementById('nonUKResident').checked;
    
    let stampDuty = 0;

    // Regular stamp duty calculation based on price brackets
    if (price <= 250000) {
        stampDuty = 0;
    } else if (price <= 925000) {
        stampDuty = (price - 250000) * 0.05;
    } else if (price <= 1500000) {
        stampDuty = (925000 - 250000) * 0.05 + (price - 925000) * 0.1;
    } else {
        stampDuty = (925000 - 250000) * 0.05 + (1500000 - 925000) * 0.1 + (price - 1500000) * 0.12;
    }

    // First-time buyer relief
    if (isFirstTimeBuyer && price <= 625000) {
        if (price <= 425000) {
            stampDuty = 0; // No stamp duty for properties under £425,000
        } else {
            stampDuty = (price - 425000) * 0.05; // Apply relief for amounts above £425,000
        }
    }

    // Buy-to-let/Second home surcharge (3%)
    if (isBuyToLet) {
        stampDuty += price * 0.03; // Add surcharge
    }

    // Non-UK resident surcharge (2%)
    if (isNonUKResident) {
        stampDuty += price * 0.02; // Add surcharge
    }

    // Ensure stamp duty is not negative
    stampDuty = Math.max(stampDuty, 0);

    // Display result
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Total Stamp Duty: £${stampDuty.toFixed(2)}`; // Fixed string interpolation
    resultDiv.style.display = 'block'; // Show result div after calculation
}


