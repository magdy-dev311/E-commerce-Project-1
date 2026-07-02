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

signupForm.classList.add("hidden");

toggleToSignup.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
});

toggleToLogin.addEventListener("click", () => {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
});

let users = JSON.parse(window.localStorage.getItem("users")) || [];

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = signupFullNameInput.value.trim();
    let email = signupEmailInput.value.trim();
    let password = signupPasswordInput.value;

    existingUser = users.find((user) => user.email === email);

    if (!existingUser) {
        let newUser = { id: Date.now(), name, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        signupFullNameInput.value = "";
        signupEmailInput.value = "";
        signupPasswordInput.value = "";
        alert("Sign Up Done");
        signupForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    } else {
        alert("Email Is Already Exist");
    }
});

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let email = loginEmailInput.value.trim();
    let password = loginPasswordInput.value;
    let user = users.find((user) => user.email === email);

    if (user) {
        if (user.password === password) {
            localStorage.setItem("user", JSON.stringify(user))
            alert("Login Successfully")
            window.location.href = "index.html"
        } else {
            alert("Email or Password Incorrect")
        }
    } else {
        alert("User Does not Exist")
    }

});
