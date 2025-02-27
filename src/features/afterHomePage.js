import { router } from "../main.js";

import afterLogin from "./afterLogin";

const serverApi = `http://localhost:3000`;

const isValidToken = async (token) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const response = await fetch(
            `${serverApi}/users?email=${email}&password=${password}`
        );

        if (!response.ok) {
            throw new Error("Token không hợp lệ hoặc đã hết hạn");
        }

        const users = await response.json();
        console.log(users);
        if (users.length > 0) {
            localStorage.setItem("token", users[0].id);
            alert("Đăng nhập thành công!");
            router.navigate("/category");
        } else {
            alert("Đăng nhập thất bại!!");
        }
    } catch (error) {
        console.error("Lỗi xác thực token:", error);
        return false;
    }
};

const afterHomePage = async () => {
    const token = localStorage.getItem("token");
    //Kiểm tra đăng nhập
    const isLoggedIn = !!token;

    if (!isLoggedIn && window.location.pathname === "/category") {
        alert("Bạn cần đăng nhập để truy cập danh mục sản phẩm!");
        router.navigate("/login");
        return;
    }

    const signInBtn = document.querySelector(".sign-in");
    const signUpBtn = document.querySelector(".sign-up");
    const logoutBtn = document.querySelector(".log-out");
    const linkHome = document.querySelector(".link-home");
    const submitSearch = document.querySelector(".submit-search");

    if (linkHome) {
        linkHome.addEventListener("click", (e) => {
            e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a
            router.navigate("/"); // Quay về trang chủ
        });
    }

    if (isLoggedIn) {
        if (signInBtn) signInBtn.style.display = "none";
        if (signUpBtn) signUpBtn.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "block";
    } else {
        if (signInBtn) signInBtn.style.display = "block";
        if (signUpBtn) signUpBtn.style.display = "block";
        if (logoutBtn) logoutBtn.style.display = "none";
    }

    const productLink = document.querySelector(".nav-links li:nth-child(2) a");
    if (productLink) {
        productLink.addEventListener("click", async (e) => {
            if (!token) {
                alert("Bạn cần đăng nhập để xem sản phẩm!");
                router.navigate("/login");
            } else {
                router.navigate("/category");
            }
        });
    }

    if (signInBtn && signUpBtn) {
        signInBtn.addEventListener("click", () => {
            router.navigate("/login");
        });

        signUpBtn.addEventListener("click", () => {
            router.navigate("/register");
        });
    }

    if (submitSearch) {
        submitSearch.addEventListener("click", (e) => {
            e.preventDefault();
            if (!isLoggedIn) {
                alert("Bạn cần đăng nhập để tìm kiếm sản phẩm!");
                router.navigate("/login");
            } else {
                router.navigate("/category");
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            alert("Bạn đã đăng xuất!");
            router.navigate("/"); // Quay về trang chủ
            afterHomePage(); // Cập nhật lại giao diện
        });
    }
};

export default afterHomePage;
