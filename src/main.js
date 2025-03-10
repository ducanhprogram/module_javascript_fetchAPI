import Navigo from "navigo";
import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage.js";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import addProduct from "./features/product/addProducts.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import AddCategory from "./features/product/addCategory.js";
import ProductDetail from "./features/product/productDetails.js";

import afterRegister from "./features/afterRegister.js";
import afterLogin from "./features/afterLogin.js";
import ProductList from "./features/product/ProductList.js";
import afterProductList from "./features/afterProductList.js";
// import afterHomePage from "./features/afterHomePage.js";
import afterAddProduct from "./features/afterAddProduct.js";
import afterAddCategory from "./features/afterAddCategory.js";
import afterProductDetail from "./features/afterProductDetail.js";

const app = document.querySelector("#app");

async function render(contentFn, beforeFn = null, afterFn = null) {
    beforeFn && beforeFn();
    app.innerHTML = await contentFn();
    afterFn && afterFn();
}

export const router = new Navigo("/", { linksSelector: "a" });

router.on("/", () => render(HomePage));

router.on("/about", () => render(AboutPage));
router.on("/register", () => render(Register, null, afterRegister));
router.on("/login", () => render(Login, null, afterLogin));

router.on("/category", () => render(ProductList, null, afterProductList));
router.on("/addProduct", () => render(addProduct, null, afterAddProduct));
router.on("/addCategory", () => render(AddCategory, null, afterAddCategory));
router.on("/detail/:id", ({ data }) => {
    const { id } = data;
    render(
        () => ProductDetail(id),
        null,
        () => setTimeout(() => afterProductDetail(id), 100) // 👈 Thêm setTimeout
    );
});
router.notFound(() => render(NotFoundPage));
router.resolve();
