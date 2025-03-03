import "../../assets/styles/product_list.css";
import { getCategories } from "../../api/categoryApi";
import HomePage from "../../pages/HomePage";
import afterAddCategory from "../afterAddCategory";
import Footer from "../../components/Footer/footer";

async function ProductList() {
    const categories = await getCategories();

    return /*html*/ `
    ${HomePage()}
    ${afterAddCategory()}
    <div class="container-category">
 
    <input type="checkbox" id="check" hidden>
    <label class="open-sidebar" for="check">
       <i class="fa-solid fa-bars"></i>
    </label>

        <aside class="sidebar">
         <label for="check" class="close-sidebar">
        <i class="fa-solid fa-xmark"></i>
          </label>

             <div class="search-box">
             <button type="submit" class="btn-search"><i class="fas fa-search"></i></button>
          <input type="text" class="input-search" placeholder="Type to Search...">
         </div>
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
        <!--end aside-->

        <main class="main">
             <section class="slider">
             <div class="slider-content">
                <h1>Chào mừng đến với cửa hàng của chúng tôi!</h1>
                <p>Khám phá các sản phẩm chất lượng với giá ưu đãi</p>
                 <button class="slider-buy">Mua ngay</button>
            </div>
             </section>
   

        <section class="products">
        <select id="sort-select">
            <option value="default">Mặc định</option>
             <option value="asc">Giá: Thấp → Cao</option>
             <option value="desc">Giá: Cao → Thấp</option>
        </select>

                <h3 id="category-title"></h3>
                <div class="product-list" id="product-list">
                                                                                                                      
                 </div>
             </section>

         </main>
    </div>
    ${Footer()}
   `;
}

export default ProductList;
