let cart = JSON.parse(localStorage.getItem("cart")) || []
let cartProductsContainer = document.querySelector(".cart-products-container")
let cartTotal = document.querySelector(".cart-total")
function displayCartProduct() {
    let html = ``
    cart.forEach((product, index) => {
        html += `<div class="col-3 col-lg-4 d-flex align-items-center justify-content-start gap-4 my-3">
                    <div class="img-box">
                        <img src=${product.image} alt="product">
                    </div>
                    <p class="product-name">${product.title}</p>
                </div>
                <div class="col-4 d-flex align-items-center justify-content-center gap-2">
                    <strong>${product.isDiscount? product.newPrice + "$":product.oldPrice + "$"}</strong>
                    <del>${product.isDiscount? product.oldPrice +"$":""}</del>
                </div>
                <div class="col-2 cart-counter d-flex align-items-center justify-content-center gap-3">
                    <span class="increment" onclick="increment(${index})">+</span> <span>${product.quantity}</span><span class="decrement" onclick="decrement(${index})">-</span>
                </div>
                <div class="col-3 col-lg-2 d-flex align-items-center justify-content-center gap-3"><p> $ ${product.isDiscount? product.newPrice * product.quantity + "$":product.oldPrice * product.quantity + "$"}</p> 
                <div class="remove mb-2" onclick="removeProduct(${index})"><i class="fas fa-xmark"></i></div>
                </div> 
                ${index == cart.length -1? `` : `<hr>`}
                `    });
    cartProductsContainer.innerHTML = html
getTotalPrice()

}
displayCartProduct()
function increment(selectedIndex) {
    cart[selectedIndex].quantity++
    localStorage.setItem("cart", JSON.stringify(cart))
    displayCartProduct()
}
function decrement(selectedIndex) {
    if (cart[selectedIndex].quantity == 1) {
        removeProduct(selectedIndex)
    } else {
        cart[selectedIndex].quantity--
        localStorage.setItem("cart", JSON.stringify(cart))
        displayCartProduct()
    }
}
function removeProduct(selectedIndex) {
    cart.splice(selectedIndex, 1)
    localStorage.setItem("cart", JSON.stringify(cart))
    displayCartProduct()
}
function getTotalPrice() {
    total = 0
    cart.forEach((product) => {
        total += product.isDiscount? product.newPrice * product.quantity:product.oldPrice * product.quantity
    })
    cartTotal.innerHTML = `$ ${total}`
}
