import "../assets/styles/homepage.css";
import logo from "../assets/styles/logo.svg";
import { Button } from "../components/common/Button";
import Slides from "../components/ui/Slides";
import afterHomePage from "../features/afterHomePage";
import ProductList from "../features/product/ProductList";
function HomePage() {
    setTimeout(() => {
        afterHomePage();
    }, 0);
    return /*html*/ ` <div class="header">
            <nav class="header-nav">
                <a class="link-home"> <img src="${logo}" alt="Logo" class="logo" /></a>
                <ul class="nav-links">
                    <li><a href="">Home</a></li>
                    <li><a href="">Product</a></li>
                    <li><a href="">Reviews</a></li>
                    <li><a href="">Contatct</a></li>
                </ul>
                  <div class="action-info">
                   <button class="sign-in">Log in</button>
				  <button class="sign-up"><i class="fa-solid fa-user-plus"></i> Sign up</button>
				  <button class="log-out"><i class="fa-solid fa-right-from-bracket"></i>Log out</button>
                  </div>
            </nav>

            <div class="content">
                <h1>Tìm kiếm sản phẩm</h1>
                <h2>Bạn cần đăng nhập để mua sản phẩm </h2>
                <form action="" class="form-input-search">
                    <input type="search" placeholder="&#x270e; Tìm kiếm..." />
                    <button type="submit" class="submit-search">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
        </div>
        `;
}

export default HomePage;
