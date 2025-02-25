import "../assets/styles/register.css";

function RegisterPage() {
    return /*html*/ `<div class="panda">
  <div class="ear"></div>
  <div class="face">
    <div class="eye-shade"></div>
    <div class="eye-white">
      <div class="eye-ball"></div>
    </div>
    <div class="eye-shade rgt"></div>
    <div class="eye-white rgt">
      <div class="eye-ball"></div>
    </div>
    <div class="nose"></div>
    <div class="mouth"></div>
  </div>
  <div class="body"> </div>
  <div class="foot">
    <div class="finger"></div>
  </div>
  <div class="foot rgt">
    <div class="finger"></div>
  </div>
</div>

<!--Bắt đầu với form -->
<form id="register-form">
  <div class="hand"></div>
  <div class="hand rgt"></div>
  <h1>Register</h1>
  
  <div class="form-group">
    <input type="text" name="email" required="required" class="form-control"/>
    <label for="register-email" class="form-label">Email</label>
    <p class="email-error" style="color: red"></p>
  </div>
  <div class="form-group">
    <input name="password" id="password" type="password" required="required" class="form-control"/>
    <label class="form-label">Password</label>
    <p class="alert">Invalid Credentials..!!</p>
   <p class="password-error" style="color: red"></p>
    <button class="btn">Register</button>
  </div>
</form>`;
}

export default RegisterPage;
