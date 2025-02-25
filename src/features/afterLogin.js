import { router } from "../main";

const serverApi = `http://localhost:3000`;

// Hàm kiểm tra token có hợp lệ không
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
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        getLogin(data);
        loginForm.reset();
    });
};

export default afterLogin;
