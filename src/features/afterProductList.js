// import { getAll } from "../../src/api/productApi";
// import ProductList from "./product/ProductList";
// import HomePage from "../pages/HomePage";

// const afterProductList = () => {
//     const categoryList = document.querySelector("#category-list");
//     const productList = document.querySelector("#product-list");
//     const categoryTitle = document.querySelector("#category-title");
//     const searchInput = document.querySelector(".input-search");
//     const sidebar = document.querySelector(".sidebar");
//     const checkBox = document.getElementById("check");
//     const iconClose = document.querySelector(".fa-xmark");
//     const iconBars = document.querySelector(".fa-bars");

//     iconBars.style.display = "none";
//     checkBox.addEventListener("click", () => {
//         if (checkBox.checked) {
//             iconClose.style.display = "none";
//             iconBars.style.display = "flex";
//             sidebar.style.display = "none";
//         } else {
//             iconClose.style.display = "block";
//             iconBars.style.display = "none";
//             sidebar.style.display = "block";
//         }
//     });

//     if (categoryList) {
//         categoryList.addEventListener("click", async (e) => {
//             console.log(e.target.classList.contains("category-item"));
//             // if (e.target.classList.contains("category-item")) {
//             //     document.querySelectorAll(".category-item").forEach((item) => {
//             //         item.classList.remove("active");
//             //     });

//             const filterProductsByCategory = async (categoryElement) => {
//                 document.querySelectorAll(".category-item").forEach((item) => {
//                     item.classList.remove("active");
//                 });

//                 e.target.classList.add("active");
//                 const categoryId = +e.target.dataset.id;
//                 const products = await getAll();

//                 const filteredProducts = products.filter((product) => {
//                     return +product.categoryId === +categoryId;
//                 });

//                 if (!categoryTitle || !productList) {
//                     return;
//                 }

//                 //Cập nhật tiêu đề danh mục
//                 categoryTitle.textContent = e.target.textContent;
//                 //Render sản phẩm
//                 productList.innerHTML = filteredProducts
//                     .map((product) => {
//                         /*html*/ return ` <div class="product-card">
//                     <div class="card">

//                     <div class="imgBox">
//                         <img src="${product.image}" alt="${
//                             product.name
//                         }" class="mouse product-image">
//                     </div>

//                     <div class="contentBox">
//                         <h3>${product.name}</h3>
//                         <h2 class="price">${product.price.toLocaleString()}</h2>
//                         <a href="#" class="buy">Buy Now</a>
//                     </div>

//                     </div>
//                     </div>`;
//                     })
//                     .join("");
//             };
//         });
//     }

//     searchInput.addEventListener("input", () => {
//         const searchValue = searchInput.value.trim().toLowerCase();

//         const matchedCategory = Array.from(
//             document.querySelectorAll(".category-item")
//         ).find((category) =>
//             category.textContent.trim().toLowerCase().includes(searchValue)
//         );

//         if (matchedCategory) {
//             filterProductsByCategory(matchedCategory);
//         }
//     });
// };

// export default afterProductList;

import { getAll } from "../../src/api/productApi";

const afterProductList = () => {
    const categoryList = document.querySelector("#category-list");
    const productList = document.querySelector("#product-list");
    const categoryTitle = document.querySelector("#category-title");
    const searchInput = document.querySelector(".input-search");

    const sidebar = document.querySelector(".sidebar");
    const checkBox = document.getElementById("check");
    const iconClose = document.querySelector(".fa-xmark");
    const iconBars = document.querySelector(".fa-bars");

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
    if (!categoryList || !productList || !searchInput) return;

    const filterProductsByCategory = async (categoryElement) => {
        document.querySelectorAll(".category-item").forEach((item) => {
            item.classList.remove("active");
        });

        categoryElement.classList.add("active");
        const categoryId = +categoryElement.dataset.id;
        const products = await getAll();

        const filteredProducts = products.filter((product) => {
            return +product.categoryId === +categoryId;
        });

        if (filteredProducts.length === 0) {
            productList.innerHTML = `<p class="no-product-message">Sản phẩm chưa có hoặc lỗi chính tả.</p>`;
            return;
        }

        categoryTitle.textContent = categoryElement.textContent;
        productList.innerHTML = filteredProducts
            .map(
                (product) => `
                <div class="product-card">
                    <div class="card">
                        <div class="imgBox">
                            <img src="${product.image}" alt="${
                    product.name
                }" class="mouse product-image">
                        </div>
                        <div class="contentBox">
                            <h3>${product.name}</h3>
                            <h2 class="price">${product.price.toLocaleString()}<small>đ</small></h2>
                            <a href="#" class="buy">Buy Now</a>
                        </div>
                    </div>
                </div>`
            )
            .join("");
    };

    categoryList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("category-item")) {
            filterProductsByCategory(e.target);
        }
    });

    searchInput.addEventListener("input", () => {
        const searchValue = searchInput.value.trim().toLowerCase();

        const matchedCategory = Array.from(
            document.querySelectorAll(".category-item")
        ).find((category) =>
            category.textContent.trim().toLowerCase().includes(searchValue)
        );

        if (matchedCategory) {
            filterProductsByCategory(matchedCategory);
        }
    });
};

export default afterProductList;
