let cart = [];


// ADD PRODUCT TO CART

function addToCart(name, price) {

    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity++;
    } 
    else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}


// UPDATE CART

function updateCart() {

    let cartItems = document.getElementById("cartItems");
    let cartCount = document.getElementById("cartCount");
    let totalPrice = document.getElementById("totalPrice");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty">Your cart is empty.</p>';

    } 
    else {

        cart.forEach((item, index) => {

            total += item.price * item.quantity;
            count += item.quantity;

            cartItems.innerHTML += `

                <div class="cart-item">

                    <div>
                        <b>${item.name}</b>
                        <p>₹${item.price}</p>
                    </div>

                    <div class="quantity">

                        <button onclick="decreaseQuantity(${index})">
                            -
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>

                </div>

            `;
        });
    }

    cartCount.innerText = count;
    totalPrice.innerText = total;
}


// INCREASE QUANTITY

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();
}


// DECREASE QUANTITY

function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


// OPEN CART

function openCart() {

    document.getElementById("cartOverlay").style.display = "block";

    updateCart();
}


// CLOSE CART

function closeCart() {

    document.getElementById("cartOverlay").style.display = "none";
}


// SEARCH PRODUCTS

function searchProducts() {

    let search =
        document.getElementById("searchBox")
        .value
        .toLowerCase();

    let products =
        document.querySelectorAll(".product");

    products.forEach(product => {

        let name =
            product
            .getAttribute("data-name")
            .toLowerCase();

        if (name.includes(search)) {
            product.style.display = "block";
        } 
        else {
            product.style.display = "none";
        }

    });
}


// CATEGORY FILTER

function filterCategory(category) {

    let products =
        document.querySelectorAll(".product");

    products.forEach(product => {

        let productCategory =
            product.getAttribute("data-category");

        if (category === "All" ||
            productCategory === category) {

            product.style.display = "block";

        } 
        else {

            product.style.display = "none";

        }

    });

}


// SHOP NOW

function scrollToProducts() {

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    alert(
        "Order placed successfully! 🎉\n\n" +
        "Total Amount: ₹" + total +
        "\n\nThank you for shopping with QuickKart!"
    );

    cart = [];

    updateCart();

    closeCart();
}