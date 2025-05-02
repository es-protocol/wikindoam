document.addEventListener("DOMContentLoaded", () => {
    // Fetch product data from the API endpoint '/api/products'
    fetch("/api/products", { cache: "no-store" })
        .then(response => response.json())
        .then(data => {
        console.log("RAW API PAYLOAD:", data); // Debugging

        // Normalize into a products array
        const products = Array.isArray(data)
            ? data
            : (data.products || []);

        // Get the container element and clear it
        const productListEl = document.getElementById("featured-product-list");
        productListEl.innerHTML = "";

        // Render cards if we have any products
        if (products.length > 0) {
            products.forEach(product => {
            // Build the correct image URL
            const imgSrc = product.image_url.startsWith("/")
                ? product.image_url
                : "/images/" + product.image_url;

            // Create and populate the card
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
                <div class="product-image">
                    <img src="${imgSrc}" alt="${product.name}">
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <span class="product-price">Le ${product.price}</span>
                <a href="/products/${product.id}" class="cta-btn">View Details</a>
            `;

            // Append to the list
            productListEl.appendChild(card);
        });
        } else {
          // No products — show fallback
            productListEl.innerHTML = "<p>No products found.</p>";
        }
    })
    .catch(error => {
        console.error("Error fetching products:", error);
        document.getElementById("featured-product-list")
        .innerHTML = "<p>Error loading products.</p>";
    });
});
