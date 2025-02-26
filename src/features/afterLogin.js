import { router } from "../main";
import HomePage from "../pages/HomePage";

const serverApi = `http://localhost:3000`;

// Hàm kiểm tra token có hợp lệ không
// const isValidToken = async (data) => {
//     try {
//         const response = await fetch(`${serverApi}/auth/login`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         if (!response.ok) {
//             throw new Error("Unauthenticated");
//         }

//         const users = await response.json();

//         return users; // Trả về true nếu token hợp lệ
//     } catch (error) {
//         console.log("Lỗi xác thực token:", error);
//         return false;
//     }
// };

const getLogin = async (data) => {
    try {
        const response = await fetch(`${serverApi}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            alert("Đăng nhập thất bại!");
            throw new Error("Đăng nhập thất bại");
        }
        const userData = await response.json();
        localStorage.setItem("token", userData.accessToken);
        localStorage.setItem("userId", userData.user.id);
        alert("Login successful! Bạn có thể xem sản phẩm chúng mình rồi....");
        router.navigate("/category");
    } catch (e) {
        console.error(e.message);
    }
};

const afterLogin = () => {
    setTimeout(() => {
        const headerHome = document.querySelector(".header");
        const contentElement = document.querySelector(".content");
        if (contentElement) {
            contentElement.remove();
        }
        headerHome.classList.add("login-page");
        headerHome.style.height = "100%";
        headerHome.style.backgroundColor = "transparent";
    }, 0);

    //Xử lý người dùng ấn vào thẻ a sang trang đăng ký
    const registerLink = document.querySelector(".register-link");
    if (registerLink) {
        registerLink.addEventListener("click", (e) => {
            e.preventDefault();
            router.navigate("/register");
        });
    }
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const response = getLogin(data);

        loginForm.reset();
    });
};

export default afterLogin;
