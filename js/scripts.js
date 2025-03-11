document.getElementById('increase').addEventListener('click', function() {
    var quantityInput = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityInput.value);
    if (!isNaN(currentQuantity)) {
        quantityInput.value = currentQuantity + 1;  // Increase the quantity
    }
});

document.getElementById('decrease').addEventListener('click', function() {
    var quantityInput = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {  // Prevent quantity from going below 1
        quantityInput.value = currentQuantity - 1;  // Decrease the quantity
    }
});
