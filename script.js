// --- 1. BARCODE SCANNER LOGIC ---
function onScanSuccess(decodedText, decodedResult) {
    // Put the scanned code into the manual input box automatically
    document.getElementById('barcodeNum').value = decodedText;
    
    // Optional: add a small beep or visual feedback here
    console.log(`Scan success: ${decodedText}`);
}

function onScanFailure(error) {
    // We usually leave this empty to avoid spamming the console
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", 
    { fps: 10, qrbox: {width: 250, height: 150} }, 
    /* verbose= */ false
);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);


// --- 2. INVENTORY MANAGEMENT LOGIC ---
function addItem() {
    const name = document.getElementById('itemName').value;
    const qty = parseInt(document.getElementById('itemQty').value);
    const barcode = document.getElementById('barcodeNum').value;

    if (name === '' || isNaN(qty)) {
        alert("Please enter at least a name and a quantity.");
        return;
    }

    const table = document.getElementById('inventoryBody');
    const row = table.insertRow();

    // Logic: If qty is less than 5, it's Low Stock
    const statusClass = qty < 5 ? 'low-stock' : 'in-stock';
    const statusText = qty < 5 ? 'Low Stock' : 'Good';

    row.innerHTML = `
        <td>${name}</td>
        <td>${qty}</td>
        <td><code>${barcode || 'Manual Entry'}</code></td>
        <td><span class="${statusClass}">${statusText}</span></td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;

    // Clear inputs for the next item
    document.getElementById('itemName').value = '';
    document.getElementById('itemQty').value = '';
    document.getElementById('barcodeNum').value = '';
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
