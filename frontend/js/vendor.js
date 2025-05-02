document.getElementById("productForm").addEventListener("submit", async e => {
    e.preventDefault();
    const statusEl = document.getElementById("status");
    statusEl.textContent = "Adding product…";

const productData = {
    id: crypto.randomUUID(),               // or generate on server
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    stock_quantity: parseInt(document.getElementById("stock_quantity").value, 10),
    store_id: "a334f791-6c6d-4696-acea-4a7fc39b4ac5",
    image: document.getElementById("image_url").value
};

try {
    const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData)
});

const json = await res.json();
console.log("CREATE RESPONSE JSON:", json); // Debugging purposes

if (res.ok) {
    statusEl.style.color = "green";
    statusEl.textContent = `Created: ${json.name}`;
    e.target.reset();
} else {
    throw new Error(json.error || JSON.stringify(json));
    }
} catch (err) {
    statusEl.style.color = "red";
    statusEl.textContent = "Error: " + err.message;
    console.error(err);
    }
});
