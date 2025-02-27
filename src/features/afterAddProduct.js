const serverApi = `http://localhost:3000`;

const getProducts = async () => {
    try {
        const response = await fetch(`${serverApi}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        const categories = await response.json();
        return categories;
    } catch (e) {
        console.error("Lỗi tải danh mục: ", e);
        return [];
    }
};

const createProduct = async (product) => {
    try {
        const response = await fetch(`${serverApi}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            alert("Thêm sản phẩm thành công");
            const result = await response.json();
            return result;
        } else {
            alert("Lỗi khi thêm sản phẩm");
        }
    } catch (e) {
        console.error("Lỗi: ", e);
    }
};

const formatPrice = (value) => {
    value = value.replace(/\D/g, ""); // Xóa ký tự không phải số
    return new Intl.NumberFormat("vi-VN").format(value);
};

const handlePriceInput = (event) => {
    const input = event.target;
    input.value = formatPrice(input.value);
};

const afterAddProduct = () => {
    const formProduct = document.getElementById("form-product");
    if (!formProduct) return;
    formProduct.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (Object.values(data).some((value) => !value.trim())) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        const priceFormatted = formatPrice(data.productPrice);

        const newProduct = {
            name: data.productName,
            price: `${priceFormatted}đ`,
            categoryId: Number(data.productCategory),
            image: data.productImage,
            description: data.productDescription,
        };
        const product = await createProduct(newProduct);

        formProduct.reset();
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const priceInput = document.getElementById("form-price");
    if (priceInput) {
        priceInput.addEventListener("input", handlePriceInput);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(afterAddProduct, 500);
});

export default getProducts;
