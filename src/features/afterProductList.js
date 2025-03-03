import { getAll } from "../../src/api/productApi";

const afterProductList = async () => {
    const categoryList = document.querySelector("#category-list");
    const productList = document.querySelector("#product-list");
    const categoryTitle = document.querySelector("#category-title");
    const searchInput = document.querySelector(".input-search");
    const header = document.querySelector(".header");
    const content = document.querySelector(".content");
    const sidebar = document.querySelector(".sidebar");
    const navLink = document.querySelector(".nav-links");
    const body = document.querySelector("body");
    const app = document.querySelector("#app");
    const checkBox = document.getElementById("check");
    const iconClose = document.querySelector(".fa-xmark");
    const iconBars = document.querySelector(".fa-bars");
    const sortSelect = document.querySelector("#sort-select");
    const activeCategory = { id: null };

    content.style.display = "none";
    header.style.height = "65px";
    header.style.background = "#fbfbfb";
    app.style.background = "#fbfbfb";
    body.style.background = "#fbfbfb";
    navLink.style.display = "none";

    iconBars.style.display = "none";
    checkBox.addEventListener("click", () => {
        if (checkBox.checked) {
            iconClose.style.display = "none";
            iconBars.style.display = "flex";
            sidebar.style.display = "none";
        } else {
            iconClose.style.display = "block";
            iconBars.style.display = "none";
            sidebar.style.display = "block";
        }
    });

    if (!categoryList || !productList || !searchInput || !sortSelect) return;

    const parsePrice = (price) => {
        console.log(Number(price.replace(/\./g, "")));
        if (typeof price === "number") return price;
        return Number(price.replace(/\./g, "")) || 0;
    };

    const renderProducts = (products) => {
        productList.innerHTML = products.length
            ? products
                  .map((product) => {
                      return `
                <div class="product-card">
                    <div class="card" data-id="${product.id}">
                        <div class="imgBox">
                            <img src="${product.image}" alt="${
                          product.name
                      }" class="mouse product-image">
                        </div>
                        <div class="contentBox">
                            <h3>${product.name}</h3>
                            <h2 class="price">${parsePrice(
                                product.price
                            ).toLocaleString()}<small>đ</small></h2>
                            <a href="#" class="buy">Buy Now</a>
                        </div>
                    </div>
                </div>`;
                  })
                  .join("")
            : `<p class="no-product-message">Không tìm thấy sản phẩm phù hợp</p>`;

        // Thêm sự kiện click để điều hướng đến chi tiết sản phẩm
        document.querySelectorAll(".card").forEach((card) => {
            card.addEventListener("click", (e) => {
                const productId = card.dataset.id;
                window.location.href = `/detail/${productId}`;
            });
        });
    };

    const sortProducts = (products, sortType) => {
        return products.sort((a, b) => {
            const priceA = parsePrice(a.price);
            const priceB = parsePrice(b.price);
            return sortType === "asc" ? priceA - priceB : priceB - priceA;
        });
    };

    const filterProductsByCategory = async (categoryElement) => {
        document.querySelectorAll(".category-item").forEach((item) => {
            item.classList.remove("active");
        });

        categoryElement.classList.add("active");
        activeCategory.id = +categoryElement.dataset.id; // Lưu danh mục đang chọn

        let products = await getAll();
        products = products.filter(
            (product) => +product.categoryId === activeCategory.id
        );
        products = sortProducts(products, sortSelect.value);

        categoryTitle.textContent = categoryElement.textContent;
        renderProducts(products);
    };

    const loadProducts = async () => {
        let products = await getAll();
        if (!Array.isArray(products)) {
            console.error("Lỗi: Dữ liệu sản phẩm không hợp lệ", products);
            return;
        }

        products = sortProducts(products, sortSelect.value);
        renderProducts(products);
    };

    await loadProducts();

    categoryList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("category-item")) {
            searchInput.value = "";
            filterProductsByCategory(e.target);
        }
    });

    const searchProducts = async () => {
        const searchValue = searchInput.value.trim().toLowerCase();
        let products = await getAll();

        if (activeCategory.id !== null) {
            products = products.filter(
                (product) => +product.categoryId === activeCategory.id
            );
        }

        if (searchValue) {
            const searchTerms = searchValue.split(" ").filter(Boolean);
            products = products.filter((product) => {
                const productName = product.name.toLowerCase();
                return searchTerms.some((term) => productName.includes(term));
            });
        }

        products = sortProducts(products, sortSelect.value);
        renderProducts(products);
    };

    searchInput.addEventListener("input", debounce(searchProducts, 500));
    sortSelect.addEventListener("change", async () => {
        let products = await getAll();

        // Nếu có danh mục đang chọn, chỉ lấy sản phẩm trong danh mục đó
        if (activeCategory.id !== null) {
            products = products.filter(
                (product) => +product.categoryId === activeCategory.id
            );
        }

        products = sortProducts(products, sortSelect.value);
        renderProducts(products);
    });
};

const debounce = (callback, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), delay);
    };
};

export default afterProductList;
