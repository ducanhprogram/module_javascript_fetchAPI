fetch("http://localhost:3000/cart", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        productId: 1,
        quantity: 1,
    }),
})
    .then((response) => response.json())
    .then((data) => console.log("Added to cart:", data))
    .catch((error) => console.error("Error:", error));
