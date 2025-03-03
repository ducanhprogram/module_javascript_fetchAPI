const afterProductDetail = async (id) => {
    console.log("ID được truyền vào:", id);
    try {
        let response = await fetch(`http://localhost:3000/products/${id}`);
        let product = await response.json();

        if (!product.id) {
            window.location.href = "/"; // Nếu không có sản phẩm, quay về trang chủ
            return;
        }

        // Gắn dữ liệu vào giao diện
        document.getElementById("product-image").src = product.image;
        document.getElementById("product-name").innerText = product.name;
        document.getElementById("product-price").innerText = product.price;
        document.getElementById("product-description").innerText =
            product.description;

        document
            .querySelector(".buttons button:first-child") // Nút Check Out
            .addEventListener("click", () => {
                window.location.href = "/category"; // Chuyển hướng đến trang category
            });

        // Hiển thị sản phẩm tương tự
        let similarResponse = await fetch("http://localhost:3000/products");
        let products = await similarResponse.json();

        let similarProducts = products.filter((p) => p.id != id);
        let listProductHTML = document.getElementById("similar-products");
        listProductHTML.innerHTML = "";

        similarProducts.forEach((product) => {
            let newProduct = document.createElement("a");
            newProduct.href = `/detail/${product.id}`;
            newProduct.classList.add("item");
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
            `;
            listProductHTML.appendChild(newProduct);
        });
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        window.location.href = "/";
    }
};

export default afterProductDetail;
