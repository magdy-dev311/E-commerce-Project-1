let loginForm = document.getElementById("login-form");
let signupForm = document.getElementById("signup-form");

let toggleToLogin = document.getElementById("toggleToLogin");
let toggleToSignup = document.getElementById("toggleToSignup");

let loginBtn = document.getElementById("login-btn");
let signupBtn = document.getElementById("signup-btn");

let loginEmailInput = document.getElementById("login-email");
let loginPasswordInput = document.getElementById("login-password");

let signupFullNameInput = document.getElementById("signup-full-name");
let signupEmailInput = document.getElementById("signup-email");
let signupPasswordInput = document.getElementById("signup-password");

signupForm.classList.add("hidden")

toggleToSignup.addEventListener("click", ()=>{
    loginForm.classList.add("hidden")
    signupForm.classList.remove("hidden")
})

toggleToLogin.addEventListener("click", ()=>{
    signupForm.classList.add("hidden")
    loginForm.classList.remove("hidden")
})

let users = JSON.parse(window.localStorage.getItem("users")) || []

signupForm.addEventListener("submit", (e) => {
    e.preventDefault()

    

})