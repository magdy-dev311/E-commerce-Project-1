let cart = JSON.parse(localStorage.getItem("cart")) || []
let cartCounter = document.getElementById("cartCounter")
renderCartCounter()


let users = JSON.parse(localStorage.getItem("users")) || []
let user = JSON.parse(localStorage.getItem("user")) || null

if (!user) {
    window.location.href = "auth.html"
}

let changeForm = document.getElementById("changeForm")
let changePasswordForm = document.getElementById("changePasswordForm")

let nameHeading = document.getElementById("nameHeading")
let nameInput = document.getElementById("nameInput")

let currentPasswordInput  = document.getElementById("currentPasswordInput")
let newPasswordInput  = document.getElementById("newPasswordInput")
let confirmNewPasswordInput  = document.getElementById("confirmNewPasswordInput")

let closeForm = document.getElementById("closeForm")
let openChangePassword = document.getElementById("openChangePassword")
let changePasswordContainer = document.getElementById("change-password-container")

let logoutBtn = document.getElementById("logoutBtn")

renderNameHeading()

let emailInput = document.getElementById("emailInput")
emailInput.value = user.email

changeForm.addEventListener("submit", (e)=>{

    e.preventDefault()

    let newName = nameInput.value.trim()

    if (!newName) {
        alert("Name Can't Be Empty");
        return;
    }

    if (user.name !== newName) {
        user.name = newName
        localStorage.setItem("user", JSON.stringify(user))
        let userInUsers = users.find(u => u.id === user.id)
        if (userInUsers) {
            userInUsers.name = newName
            localStorage.setItem("users", JSON.stringify(users))
        }
        renderNameHeading()
        alert("Name Updated Successfully")
    } else {
        alert("Please Entre Another Name")
    }

})

function renderCartCounter(){
    cartCounter.textContent = cart.length
}

function renderNameHeading () {
        nameHeading.textContent = user.name
        nameInput.value = user.name
}

changePasswordForm.addEventListener("submit", (e)=>{

    e.preventDefault()

    let curPassword = currentPasswordInput.value;
    let newPassword = newPasswordInput.value;
    let confirmNewPassword = confirmNewPasswordInput.value;

    if (curPassword === user.password) {
        if (newPassword === confirmNewPassword) {
            if (newPassword === user.password) {
                alert("New Password Must Be Different");
                return;
            }
            user.password = newPassword
            localStorage.setItem("user", JSON.stringify(user))

            let findUser = users.find((e)=>e.id === user.id)
            if (findUser){
                findUser.password = newPassword
                localStorage.setItem("users", JSON.stringify(users))
            }
            alert("Password Changed Successfully")
            changePasswordContainer.classList.remove("flex")
            changePasswordContainer.classList.add("hidden")
        } else {
            alert("Confirm Password Does not Match New Password")
            newPasswordInput.classList.add("border-red-600")
            confirmNewPasswordInput.classList.add("border-red-600")
        }
    } else {
        alert("Wrong Password")
        currentPasswordInput.classList.add("border-red-600")
    }

})

openChangePassword.addEventListener("click", ()=>{
    changePasswordContainer.classList.remove("hidden")
    changePasswordContainer.classList.add("flex")
})

closeForm.addEventListener("click", ()=>{
    changePasswordContainer.classList.remove("flex")
    changePasswordContainer.classList.add("hidden")
})

logoutBtn.addEventListener("click", ()=>{
    localStorage.removeItem("user");
    window.location.href = "auth.html";
})