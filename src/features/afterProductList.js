import { getAll } from "../../src/api/productApi";
import ProductList from "./product/ProductList";

const afterProductList = () => {
    const categoryList = document.querySelector("#category-list");
    const productList = document.querySelector("#product-list");
    const categoryTitle = document.querySelector("#category-title");

    if (categoryList) {
        categoryList.addEventListener("click", async (e) => {
            console.log(e.target.classList.contains("category-item"));
            if (e.target.classList.contains("category-item")) {
                document.querySelectorAll(".category-item").forEach((item) => {
                    item.classList.remove("active");
                });

                e.target.classList.add("active");
                const categoryId = +e.target.dataset.id;
                const products = await getAll();
                const filteredProducts = products.filter((product) => {
                    return +product.categoryId === +categoryId;
                });

                if (!categoryTitle || !productList) {
                    console.error("categoryTitle hoặc productList bị null");
                    return;
                }

                //Cập nhật tiêu đề danh mục
                categoryTitle.textContent = e.target.textContent;
                //Render sản phẩm
                productList.innerHTML = filteredProducts
                    .map((product) => {
                        console.log(product);
                        /*html*/ return `  <div class="product-card">
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
                    </div>`;
                    })
                    .join("");
            }
        });
    }
};

export default afterProductList;
