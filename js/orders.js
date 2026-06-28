let cart = JSON.parse(localStorage.getItem("cart")) || []
let cartCounter = document.getElementById("cartCounter")
cartCounter.textContent = cart.length

let totalParagrabh = document.getElementById("total")

let orders = JSON.parse(localStorage.getItem("orders")) || []

let ordersContainer = document.getElementById("ordersContainer")



function render() {
    ordersContainer.innerHTML=""
    let total = 0

    orders.forEach((order) => {
        ordersContainer.innerHTML+=`
                        <tr class="hover:bg-surface-container-lowest/50 transition-colors group">
                            <td class="px-6 py-6 font-mono text-sm text-on-surface">${order.id}</td>
                            <td class="px-6 py-6 text-sm text-on-surface">${order.date.slice(0,10)}</td>
                            <td class="px-6 py-6">
                                <span
                                    class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">Pending</span>
                            </td>
                            <td class="px-6 py-6 text-sm text-on-surface-variant">
                                ${order.products.map((p)=>p.name).join(" | ")}
                            </td>
                            <td class="px-6 py-6 font-bold text-on-surface">$${order.total.toFixed(2)}</td>
                            <td class="px-6 py-6 text-right">
                                <button
                                    onclick="deleteOrder(${order.id})"
                                    class="material-symbols-outlined text-on-surface-variant hover:text-error transition-all p-2 rounded-lg hover:bg-error/5 active:scale-90">delete</button>
                            </td>
                        </tr>
        `
        total += order.total
    })
    totalParagrabh.textContent = `$${total.toFixed(2)}`
}

render()

function deleteOrder (id) {
    if (!confirm("Are you sure you want to delete this order?")) {
        return;
    }
    orders = orders.filter((o)=>o.id !== id)
    localStorage.setItem("orders", JSON.stringify(orders))
    render()
}