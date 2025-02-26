import "../assets/styles/login.css";
import HomePage from "./HomePage";

function Login() {
    return /*html*/ `
            ${HomePage()}
              <form id="login-form">
            <h2>Login</h2>
            <div class="mb-3">
                <label for="login-email" class="form-label">Email</label>
                <input
                    type="text"
                    name="email"
                    id="login-email"
                    placeholder="Enter email"
                    required
                    class="form-control"
                />
            </div>
            <div class="mb-3">
                <label for="login-password" class="form-label" placeholder="Enter password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="login-password"
                    placeholder="Enter password"
                    required
                    class="form-control"
                />
            </div>
            <div class="mb-3">
                <button class="btn btn-primary login">Log in</button>
            </div>

            <div class="form-group">
              <p>Bạn chưa có tài khoản? <a href="#" class="register-link">Đăng ký</a></p>
            </div>
        </form>
    `;
}

export default Login;
