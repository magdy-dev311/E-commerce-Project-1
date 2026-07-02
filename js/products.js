let slider = document.getElementById("slider")
let cart = JSON.parse(localStorage.getItem("cart")) || []
let cartCount = document.getElementById("cartCount")
cartCount.textContent = cart.length

let user = JSON.parse(localStorage.getItem("user")) || null

let profileBtn = document.getElementById("profileBtn")

profileBtn.addEventListener("click", ()=>{
    if(!user){
        window.location.href = "auth.html"
    }else {
        window.location.href = "profile.html"
    }
})

let products = [
    {
        id: 1,
        name: "Modern Desk Lamp",
        img: "Images/slider-1.png",
        price: 30.00,
        reviews: 128,
    },
    {
        id: 2,
        name: "Smart Watch",
        img: "Images/slider-2.png",
        price: 200.00,
        reviews: 600,
    },
    {
        id: 3,
        name: "Wall Clock",
        img: "Images/slider-3.png",
        price: 80.00,
        reviews: 800,
    },
    {
        id: 4,
        name: "Laptop",
        img: "Images/slider-4.png",
        price: 3000.00,
        reviews: 3000,
    },
    {
        id: 5,
        name: "iPhone 16 Pro Max",
        img: "Images/slider-5.webp",
        price: 8000.00,
        reviews: 3000,
    },
    {
        id: 6,
        name: "Air Pods 4",
        img: "Images/slider-6.webp",
        price: 1000.00,
        reviews: 2000,
    },
]

slider.innerHTML = ""
products.forEach((product) => {
    slider.innerHTML += `
            <div class="flex flex-col mx-2 relative group group-hover:translate-y-0 group-hover:opacity-100">
                <button
                    onclick="addToCart(${product.id})"
                    class="hidden lg:block opacity-0 duration-300 translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 g absolute z-50 left-2 right-2 py-2 top-[67%] cursor-pointer text-white bg-blue-700 font-semibold rounded-md">Add
                    To Cart
                </button>
                <div class="relative">
                    <img src="${product.img}" alt="" class="rounded-lg">
                    <div
                        class="absolute right-[10px] top-[10px] w-[35px] h-[35px] text-[22px] flex justify-center items-center bg-white rounded-full  cursor-pointer">
                        <i class="fa-solid fa-heart "></i>
                    </div>
                </div>
                <div class="flex flex-col gap-1 mt-2">
                    <h3 class="text-xl font-semibold">${product.name}</h3>
                    <div class="flex items-center gap-2">
                        <div class="flex text-sm">
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <i class="fa-solid fa-star-half-stroke text-yellow-400"></i>
                        </div>
                        <span class="text-gray-500">(${product.reviews})</span>
                    </div>
                    <span class="text-blue-500 font-semibold">$${product.price.toFixed(2)}</span>
                    <button
                    onclick="addToCart(${product.id})"
                    class="lg:hidden py-2 cursor-pointer text-white bg-blue-700 font-semibold rounded-md">Add
                    To Cart
                </button>
                </div>
            </div>
    `
})

function addToCart(id) {
    if (user) {
        let product = products.find((pro) => pro.id === id)
        let exist = cart.find((item) => item.id === id)
        if (!exist) {
            cart.push({ ...product, quantity: 1 })
            localStorage.setItem("cart", JSON.stringify(cart))
            cartCount.textContent = cart.length
            alert("Product Added Succesfully")
        } else {
            alert("Product Is Already Exist")
        }
    } else {
        alert("Login or Signup to Complete Process")
        window.location.href = "auth.html"
    }
}