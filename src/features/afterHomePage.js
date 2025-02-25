import { router } from "../main";
import afterLogin from "./afterLogin";

const serverApi = `http://localhost:3000`;

const isValidToken = async (token) => {
    try {
        const response = await fetch(`${serverApi}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();
        return data.valid; // Trả về true nếu token hợp lệ
    } catch (error) {
        console.log("Lỗi xác thực token:", error);
        return false;
    }
};

const afterHomePage = () => {
    setTimeout(async () => {
        const token = localStorage.getItem("token");
        //Kiểm tra đăng nhập
        const isLoggedIn = token && (await isValidToken(token));

        const signInBtn = document.querySelector(".sign-in");
        const signUpBtn = document.querySelector(".sign-up");
        const logoutBtn = document.querySelector(".log-out");

        if (isLoggedIn) {
            if (signInBtn) signInBtn.style.display = "none";
            if (signUpBtn) signUpBtn.style.display = "none";
            if (logoutBtn) logoutBtn.style.display = "block";
        } else {
            if (signInBtn) signInBtn.style.display = "block";
            if (signUpBtn) signUpBtn.style.display = "block";
            if (logoutBtn) logoutBtn.style.display = "none";
        }

        const productLink = document.querySelector(
            ".nav-links li:nth-child(2) a"
        );
        if (productLink) {
            productLink.addEventListener("click", async (e) => {
                if (!isLoggedIn) {
                    e.preventDefault();
                    alert("Bạn cần đăng nhập để xem sản phẩm!");
                    router.navigate("/login");
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

        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                alert("Bạn đã đăng xuất!");
                router.navigate("/");
                afterHomePage(); // Cập nhật lại giao diện
            });
        }
    }, 0);
};

export default afterHomePage;
