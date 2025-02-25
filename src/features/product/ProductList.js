import "../../assets/styles/product_list.css";
import { getCategories } from "../../api/categoryApi";
import HomePage from "../../pages/HomePage";

async function ProductList() {
    const categories = await getCategories();
    //fetch products form the server
    return /*html*/ `
       <section class="slider">
        <div class="slider-content">
            <h1>Chào mừng đến với cửa hàng của chúng tôi!</h1>
            <p>Khám phá các sản phẩm chất lượng với giá ưu đãi</p>
            <button class="slider-buy">Mua ngay</button>
        </div>
    </section>
    <div class="container">
    <aside class="sidebar">
    <h2>Danh mục sản phẩm</h2>
            <ul id="category-list" class="category-list">
            ${categories
                .map((category) => {
                    return `<li data-id="${category.id}" class="category-item">
                        <img src="${category.image}" alt="${category.name}" class="category-icon">
                        ${category.name}
                    </li>`;
                })
                .join("")}
            </ul>
        </aside>

        <section class="products">
                <h3 id="category-title"></h3>
                <div class="product-list" id="product-list">
                <!--
                    <div class="product-card">
                    <div class="card">

                    <div class="imgBox">
                        <img src="https://cdn.tgdd.vn/Products/Images/42/329143/iphone-16-pro-titan-tu-nhien.png" alt="mouse corsair" class="mouse">
                    </div>

                    <div class="contentBox">
                        <h3>iPhone 16 Pro</h3>
                        <h2 class="price">20.000.000<small>đ</small></h2>
                        <a href="#" class="buy">Buy Now</a>
                    </div>

                    </div>
                    </div>
                    -->
                </div>
        </section>
    </div>
   `;
}

export default ProductList;
