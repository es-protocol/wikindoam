// Ensure that this script only runs on the product page
if (window.location.pathname.includes('/products/')) {
    // Get the product ID from the URL
    const productId = window.location.pathname.split("/").pop();  // This will fetch the last part of the URL, e.g., "1" for /products/1

    // Fetch product data from the backend
    fetch(`http://localhost:5000/api/products/${productId}`)
        .then(response => response.json())  // Convert response to JSON
        .then(data => {
            // Populate the product details in the HTML
            if (data.product) {
                document.getElementById('product-name').textContent = data.product.name;
                document.getElementById('product-description').textContent = data.product.description;
                document.getElementById('product-price').textContent = `Le ${data.product.price}`;
                document.getElementById('product-stock').textContent = data.product.stock_quantity;
                document.getElementById('product-store-id').textContent = data.product.store_id;

                // Set the product image dynamically
                document.getElementById('product-img').src = data.product.image; // Set the image source dynamically
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            alert('Error loading product details.');
        });
}
