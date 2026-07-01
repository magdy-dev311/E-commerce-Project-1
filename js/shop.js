let cart = JSON.parse(localStorage.getItem("cart")) || []
let cartCount = document.getElementById("cartCounter")
let user = JSON.parse(localStorage.getItem("user")) || null
cartCount.textContent = cart.length


console.log(user);


let products = [
    {
        id: 1,
        name: "Modern Desk Lamp",
        img: "Images/slider-1.png",
        price: 30.00,
        reviews: 128,
        badge: "top rated",
        stars: 5
    },
    {
        id: 2,
        name: "Smart Watch",
        img: "Images/slider-2.png",
        price: 200.00,
        reviews: 600,
        badge: "sale",
        stars: 4
    },
    {
        id: 3,
        name: "Wall Clock",
        img: "Images/slider-3.png",
        price: 80.00,
        reviews: 800,
        badge: "top rated",
        stars: 3
    },
    {
        id: 4,
        name: "Laptop",
        img: "Images/slider-4.png",
        price: 3000.00,
        reviews: 3000,
        badge: "sale",
        stars: 5
    },
    {
        id: 5,
        name: "iPhone 16 Pro Max",
        img: "Images/slider-5.webp",
        price: 8000.00,
        reviews: 3000,
        badge: "out of stock",
        stars: 5
    },
    {
        id: 6,
        name: "Air Pods 4",
        img: "Images/slider-6.webp",
        price: 1000.00,
        reviews: 2000,
        badge: "new",
        stars: 3
    },
]

let cardsContainer = document.getElementById("crds-container")

function render() {
    cardsContainer.innerHTML = ""
    products.forEach((e) => {
        let stars = ``
        for (let i = 0; i < e.stars; i++) {
            stars += `
            <span class="material-symbols-outlined filled-icon text-lg">star</span>
            `
        }
        cardsContainer.innerHTML += `
                        <div
                            class="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none">
                            <div class="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                                <img class="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                    data-alt="Black professional studio headphones over ear"
                                    src="${e.img}" />
                                <span
                                    class="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-[10px] font-bold uppercase rounded tracking-wider">${e.badge}</span>
                            </div>
                            <div class="flex flex-1 flex-col space-y-2 p-4">
                                <h3 class="text-sm font-bold text-slate-900 dark:text-white">
                                    <a href="#">
                                        <span aria-hidden="true" class="absolute inset-0"></span>
                                        WH-1000XM5 Wireless Noise Cancelling
                                    </a>
                                </h3>
                                <div class="flex items-center gap-1">
                                    <div class="flex text-amber-400">
                                        ${stars}
                                    </div>
                                    <span class="text-[10px] text-slate-400">(42)</span>
                                </div>
                                <div class="mt-auto flex items-center justify-between">
                                    <p class="text-lg font-bold text-slate-900 dark:text-white">$${e.price}</p>
                                    <button
                                        onclick="addToCart(${e.id})"
                                        class="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                                        <span class="material-symbols-outlined">add_shopping_cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
        `
    })
}

render()

function addToCart(id) {
    if (user) {
        let product = products.find(e => e.id === id)
        let exist = cart.find(e => e.id === id)
        if (!exist) {
            cart.push({
                ...product,
                quantity: 1
            })
            localStorage.setItem("cart", JSON.stringify(cart))
            cartCount.textContent = cart.length
            alert("Product Added Succefully")
        } else {
            alert("Product Is Already Exist")
        }
    } else {
        alert("Please Login or Sign Up Firstly")
        window.location.href = "auth.html"
    }
}