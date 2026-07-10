let user = JSON.parse(localStorage.getItem("user")) || []

if (user.role !== "admin") {
    window.location.href = "../index.html"
}

let categories = JSON.parse(localStorage.getItem("categories")) || []

let uploadImageInput = document.getElementById("uploadImageInput")
let categoryNameInput = document.getElementById("categoryNameInput")
let categoriesContainer = document.getElementById("categoriesContainer")
let discardBtn = document.getElementById("discardBtn")
let form = document.forms[0]
let editId = null
let scrollVar = 0

document.getElementById("adminName").textContent = user.name

renderCategories()

function renderCategories() {
    categoriesContainer.innerHTML = ""
    categories.forEach(e => {
        categoriesContainer.innerHTML += `
        <div
                            class="group relative bg-surface rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg">
                            <div class="aspect-[4/5] relative overflow-hidden">
                                <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    data-alt="A high-end editorial product shot of luxury footwear displayed in a minimalist boutique setting. The composition uses dramatic lighting and shadow to highlight textures. The color palette is composed of soft tans, bright whites, and the signature Azure Meridian technical blue. Sophisticated atmosphere for a modern e-commerce experience."
                                    src="${e.image}" />
                                <!-- Glassmorphic Overlay on Hover -->
                                <div
                                    class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <div
                                        class="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 flex justify-between items-center shadow-xl">
                                        <div class="flex justify-between w-full">
                                            <button
                                                type="button"
                                                onclick="editCategory(${e.id})"
                                                class="w-8 h-8 rounded-full bg-white text-on-surface flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                                <span class="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                            <button
                                                type="button"
                                                onclick="deleteCategory(${e.id})"
                                                class="w-8 h-8 rounded-full bg-white text-error flex items-center justify-center hover:bg-error hover:text-white transition-colors">
                                                <span class="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 bg-white">
                                <h3 class="font-black text-lg tracking-tight">${e.name}</h3>
                                
                            </div>
                        </div>
        `
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let name = categoryNameInput.value.trim()
    let file = uploadImageInput.files[0]

    if (!editId) {
        if (name && file) {
            let reader = new FileReader()
            reader.onload = () => {
                categories.push({ id: Date.now(), name, image: reader.result })
                localStorage.setItem("categories", JSON.stringify(categories))
                renderCategories()
                form.reset()
            }
            reader.readAsDataURL(file)
        } else {
            alert("Please Fill All Inputs")
        }
    } else {
        let category = categories.find(e => e.id === editId)
        if (name) {
            if (name !== category.name) {
                category.name = name
                localStorage.setItem("categories", JSON.stringify(categories))
                form.reset()
                renderCategories()
            }
            editId = null
        }

        if (file) {
            let reader = new FileReader()
            reader.onload = () => {
                category.image = reader.result
                localStorage.setItem("categories", JSON.stringify(categories))
                form.reset()
                renderCategories()
                editId = null
            }
            reader.readAsDataURL(file)
        }
        window.scrollTo(0,scrollVar)
    }
})

function editCategory(id) {
    scrollVar = window.scrollY
    editId = id
    let category = categories.find(e => e.id === id)
    if (!category) return;
    categoryNameInput.value = category.name
    window.scrollTo(0, 0)
    categoryNameInput.focus()
}

function deleteCategory(id) {
    if (!confirm("Are You Sure to Delete This Category")) return
    categories = categories.filter(e => e.id !== id)
    localStorage.setItem("categories", JSON.stringify(categories))
    renderCategories()
}

discardBtn.addEventListener("click", () => {
    form.reset()
    editId = null
})

document.getElementById("signOutBtn").addEventListener("click", ()=>{
    localStorage.removeItem("user");
    window.location.href = "../auth.html";
})