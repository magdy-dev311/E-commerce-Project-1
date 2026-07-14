let user = JSON.parse(localStorage.getItem("user")) || []

if (user.role !== "admin") {
    window.location.href = "../index.html"
}

document.getElementById("adminName").textContent = user.name

let categories = JSON.parse(localStorage.getItem("categories")) || []
let products = JSON.parse(localStorage.getItem("products")) || []

let editId = null

let point;

const form = document.forms[0]
const nameInput = document.getElementById("nameInput")
const priceInput = document.getElementById("priceInput")
const categoryInput = document.getElementById("categoryInput")
const brandInput = document.getElementById("brandInput")
const badgeInput = document.getElementById("badgeInput")
const imageInput = document.getElementById("imageInput")

function renderOptions () {
    categoryInput.innerHTML = ""
    categories.forEach(c => {
        categoryInput.innerHTML += `
    <option>${c.name}</option>
    `
    })
}

renderOptions()

const productsContainer = document.getElementById("productsContainer")
renderProducts()
function renderProducts() {
    productsContainer.innerHTML = ""
    products.forEach(p => {
        productsContainer.innerHTML += `
            <div
                class="bg-surface border border-outline rounded-xl overflow-hidden group hover:shadow-md transition-shadow">
                <div class="aspect-[4/3] relative bg-surface-container overflow-hidden">
                    <div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style="background-image: url('${p.image}')">
                    </div>
                    <div class="absolute top-3 right-3 flex gap-2">
                        <button
                            onclick = "editProduct(${p.id})"
                            class="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur text-on-surface-variant hover:text-primary rounded-lg transition-colors shadow-sm">
                            <span class="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                            onclick = "deleteProduct(${p.id})"
                            class="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur text-on-surface-variant hover:text-error rounded-lg transition-colors shadow-sm">
                            <span class="material-symbols-outlined text-lg">delete</span>
                        </button>
                    </div>
                    <div class="absolute top-3 left-3">
                        <span
                            class="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">${p.badge}</span>
                    </div>
                </div>
                <div class="p-4 flex justify-between items-start">
                    <div>
                        <h3 class="font-bold text-base truncate pr-2">${p.name}</h3>
                        <p class="text-xs text-on-surface-variant font-medium">${p.category} • ${p.brand}</p>
                    </div>
                    <div class="text-right">
                        <span class="font-black text-primary">${p.price}</span>
                    </div>
                </div>
            </div>
        `
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (
        !nameInput.value ||
        !priceInput.value ||
        !categoryInput.value ||
        !brandInput.value ||
        !badgeInput.value 
    ) {
        alert("Please Full All Fields")
        return
    }

    if (!editId) {
        if (
            !imageInput.files.length
        ) {
            alert("Please Full All Fields")
            return
        }
        let reader = new FileReader()
        reader.onload = () => {
            products.push({
                id: Date.now(),
                name: nameInput.value.trim(),
                price: Number(priceInput.value),
                category: categoryInput.value,
                brand: brandInput.value.trim(),
                badge: badgeInput.value.trim(),
                image: reader.result,
            })
            localStorage.setItem("products", JSON.stringify(products))
            form.reset()
            renderProducts()
        }
        reader.readAsDataURL(imageInput.files[0])
    } else {
        let product = products.find( p => p.id === editId)
        if (!imageInput.files.length) {
            product.name = nameInput.value.trim()
            product.price = Number(priceInput.value)
            product.category = categoryInput.value
            product.brand = brandInput.value.trim()
            product.badge = badgeInput.value.trim()
            localStorage.setItem("products", JSON.stringify(products))
            renderProducts()
            form.reset()
            editId=null
            window.scrollTo(0, point)
            return
        } else {
            let reader = new FileReader()
            reader.onload = () => {
                product.name = nameInput.value.trim()
                product.price = Number(priceInput.value)
                product.category = categoryInput.value
                product.brand = brandInput.value.trim()
                product.badge = badgeInput.value.trim()
                product.image = reader.result
                localStorage.setItem("products", JSON.stringify(products))
                renderProducts()
                editId = null
                form.reset()
                window.scrollTo(0, point)
            }
            reader.readAsDataURL(imageInput.files[0])
        }
        
    }
})

function editProduct (id) {
    let product = products.find( p => p.id === id )
    if (!product)return
    nameInput.value = product.name
    priceInput.value = product.price
    badgeInput.value = product.badge
    brandInput.value = product.brand
    categoryInput.value = product.category
    editId = id
    point=window.scrollY
    window.scrollTo(0,0)
}

document.getElementById("signOutBtn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../auth.html";
})

function deleteProduct (id) {
    if(!confirm("Are You Sure To delete This Product?"))return
    products = products.filter( p => p.id !== id)
    localStorage.setItem("products", JSON.stringify(products))
    renderProducts()
}