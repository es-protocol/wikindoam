document.addEventListener("DOMContentLoaded", () => {
    // Fetch product data from the API endpoint '/api/products'
    fetch("/api/products")
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            // Get the container element where product cards will be inserted
            const productListEl = document.getElementById("featured-product-list");

            // Check if data.products is an array
            if (data.products && Array.isArray(data.products)) {
                // Loop over each product and create a product card
                data.products.forEach(product => {
                    // Create a div element for the product card
                    const card = document.createElement("div");
                    card.classList.add("product-card");

                    // Build the inner HTML for the product card
                    card.innerHTML = `
                        <div class="product-image">
                            <img src="${product.image.startsWith('/') ? product.image : '/images/' + product.image}" alt="${product.name}">
                        </div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <span class="product-price">Le ${product.price}</span>
                        <a href="/products/${product.id}" class="cta-btn">View Details</a>
                    `;

                    // Append the card to the product list container
                    productListEl.appendChild(card);
                });
            } else {
                // Display a message if no products are found
                productListEl.innerHTML = "<p>No products found.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            document.getElementById("featured-product-list").innerHTML = "<p>Error loading products.</p>";
        });
});
