let cart = JSON.parse(localStorage.getItem("cart")) || []
let cartContainer = document.getElementById("cartContainer")
let cartCounter = document.getElementById("cartCounter")
let clearCartBtn = document.getElementById("clearCartBtn")
let totalSpan = document.getElementById("totalSpan")
let SubTotalSpan = document.getElementById("SubTotalSpan")
let checkoutBtn = document.getElementById("checkoutBtn")
let totalPrice = 0

function render () {
    cartCounter.textContent = cart.length
    cartContainer.innerHTML = ""

    let subTotal = 0
    let shipping = 15
    let tax = 10


    cart.forEach((product) => {
        cartContainer.innerHTML += `
    <div
                        class="grid grid-cols-2 md:grid-cols-[3fr_1fr_1fr_1fr] justify-items-start md:justify-items-center border-2 border-gray-200/80 rounded-md py-4 2xl:py-5 items-center px-3 2xl:px-0 gap-y-6 md:gap-0 bg-white">
                        <div class="flex gap-1 items-center col-span-2 md:col-span-1">
                            <img src="${product.img}" class="aspect-square w-[100px] md:w-[180px] rounded-md" alt="">
                            <div class="flex flex-col gap-2 pl-5">
                                <h3 class="text-xl font-semibold">${product.name}</h3>
                                <div class="flex items-center gap-15">
                                    <button class="hover:text-green-700 transition duration-300 cursor-pointer text-gray-700"><i class="fa-solid fa-heart"></i> Save</button>
                                    <button onclick="removeProduct(${product.id})" class="hover:text-red-700 transition duration-300 cursor-pointer text-gray-700"><i class="fa-solid fa-x"></i> Remove</button>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-200/50 text-gray-600 text-[17px] px-2 py-1 rounded-md flex items-center justify-center gap-2">
                            <button onclick="decreaseQuantity(${product.id})" class="cursor-pointer"><i class="fa-solid fa-minus text-gray-500"></i></button>
                            <span class="text-xl font-medium">${product.quantity}</span>
                            <button onclick="increaseQuantity(${product.id})" class="cursor-pointer"><i class="fa-solid fa-plus text-gray-500"></i></button>
                        </div>
                        <span class="hidden md:block text-lg ">$${product.price.toFixed(2)}</span>
                        <span class="text-lg font-bold">$${(product.price * product.quantity).toFixed(2)}</span>
                    </div>
    `
        subTotal += product.price * product.quantity

    })
    SubTotalSpan.textContent = `$${subTotal.toFixed(2)}`
    totalPrice = (subTotal + shipping + tax).toFixed(2)
    totalSpan.textContent = `$${totalPrice}`
}

render()

function removeProduct(id) {
    if (!confirm("Are you sure you want to remove this product?")) {
        return;
    }

    cart = cart.filter((pro)=>pro.id !== id)
    localStorage.setItem("cart", JSON.stringify(cart))
    render()
}

function increaseQuantity (id) {
    let product = cart.find((pro)=>pro.id === id)
    product.quantity++
    localStorage.setItem("cart", JSON.stringify(cart))
    render()
}

function decreaseQuantity(id) {
    let product = cart.find((pro)=>pro.id === id)
    if (product.quantity > 1) {
        product.quantity--
        localStorage.setItem("cart", JSON.stringify(cart))
        render()
    } else{
        alert("Cannot Decreased to 0")
    }
}

function clearCart() {
    if (cart.length) {
        if (!confirm("Are you sure you want to clear the cart?")) {
            return;
        }
        cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        render()
    } else {
        alert("The Cart is Already Empty")
    }
}

clearCartBtn.addEventListener("click", () => clearCart())

checkoutBtn.addEventListener("click", () => {
    if (!cart.length) {
        alert("Your cart is empty");
        return;
    }

    let orders = JSON.parse(localStorage.getItem("orders")) || []

    let newOrder = {
        id : Date.now(),
        products: [...cart],
        total: Number(totalPrice),
        date: new Date().toISOString()
    }

    orders.push(newOrder)

    localStorage.setItem("orders", JSON.stringify(orders))

    cart = []
    localStorage.setItem("cart", JSON.stringify(cart))

    render()

    alert("Order placed successfully!")

    window.location.href = "orders.html"
})