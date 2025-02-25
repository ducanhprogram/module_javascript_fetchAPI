import { router } from "../main";
const serverApi = `http://localhost:3000`;

//https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js

async function loadJQuery() {
    await import(
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"
    );

    validation();
}

// Gọi hàm để tải jQuery
loadJQuery();

function validation() {
    $("#password").focusin(function () {
        $("form").addClass("up");
    });
    $("#password").focusout(function () {
        $("form").removeClass("up");
    });

    // Panda Eye move
    $(document).on("mousemove", function (event) {
        var dw = $(document).width() / 15;
        var dh = $(document).height() / 15;
        var x = event.pageX / dw;
        var y = event.pageY / dh;
        $(".eye-ball").css({
            width: x,
            height: y,
        });
    });

    // validation

    $(".btn").click(function () {
        $("form").addClass("wrong-entry");
        setTimeout(function () {
            $("form").removeClass("wrong-entry");
        }, 3000);
    });
}

const getRegister = async (data) => {
    try {
        const response = await fetch(`${serverApi}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            alert("Đăng ký thất bại!!!");
            throw new Error("Đăng ký thất bại!!!");
        }

        const userData = await response.json();

        if (userData.hasOwnProperty("user")) {
            alert("Registration successfull");
            router.navigate("/login");
        }
    } catch (e) {
        console.error(e);
    }
};

const afterRegister = () => {
    const registerForm = document.querySelector("#register-form");
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    const alertP = registerForm.querySelector(".alert");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fornData = new FormData(e.target);
        const data = Object.fromEntries(fornData);

        const email = data.email;
        const password = data.password;

        if (!email) {
            alertP.style.display = "block";
            emailError.textContent = "Email không được để trống";
        }

        if (password.length < 6) {
            alertP.style.display = "block";

            passwordError.textContent =
                "Password must be at least 6 characters long";

            return;
        }

        getRegister(data);
        registerForm.reset();
    });
};

export default afterRegister;
