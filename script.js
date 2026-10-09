/* =================================================
   GLAMWITHFAHVE SHOPPING CART
   ================================================= */


let cart = [];


/* ================= FORMAT MONEY ================= */

function formatMoney(amount) {

    return "₦" + Number(amount).toLocaleString();

}


/* ================= ADD TO CART ================= */

function addToCart(button) {

    const productElement =
        button.closest(".product");


    const name =
        productElement.dataset.name;


    const price =
        Number(productElement.dataset.price);


    const size =
        productElement.dataset.size;


    const existingProduct =
        cart.find(item => item.name === name);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            size: size,

            quantity: 1

        });

    }


    updateCart();


    alert(
        name + " has been added to your cart."
    );

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");


    const cartCount =
        document.getElementById("cart-count");


    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let totalItems = 0;

    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>

        `;

    }


    cart.forEach((item, index) => {

        const subtotal =
            item.price * item.quantity;


        totalItems += item.quantity;

        totalPrice += subtotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ${item.size}
                    </p>

                    <p>
                        ${formatMoney(item.price)}
                    </p>


                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove-button"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    cartCount.textContent =
        totalItems;


    cartTotal.textContent =
        formatMoney(totalPrice);

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* ================= REMOVE ITEM ================= */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    updateCart();

    document
        .getElementById("cartOverlay")
        .style.display = "flex";

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartOverlay")
        .style.display = "none";

}


/* ================= OPEN CHECKOUT ================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Please add a product to your cart first."
        );

        return;

    }


    closeCart();


    document
        .getElementById("checkoutOverlay")
        .style.display = "flex";

}


/* ================= CLOSE CHECKOUT ================= */

function closeCheckout() {

    document
        .getElementById("checkoutOverlay")
        .style.display = "none";

}


/* ================= SEARCH PRODUCTS ================= */

function searchProducts() {

    const search =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();


    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();


        if (name.includes(search)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


/* ================= CHECKOUT FORM ================= */

document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            const customerName =
                document
                .getElementById("customerName")
                .value;


            const customerEmail =
                document
                .getElementById("customerEmail")
                .value;


            const customerPhone =
                document
                .getElementById("customerPhone")
                .value;


            const deliveryAddress =
                document
                .getElementById("deliveryAddress")
                .value;


            const city =
                document
                .getElementById("city")
                .value;


            const state =
                document
                .getElementById("state")
                .value;


            const instructions =
                document
                .getElementById("instructions")
                .value;


            let orderDetails = "";

            let total = 0;


            cart.forEach(item => {

                const subtotal =
                    item.price *
                    item.quantity;


                total += subtotal;


                orderDetails +=

                    item.name +

                    " | " +

                    item.size +

                    " | Quantity: " +

                    item.quantity +

                    " | " +

                    formatMoney(subtotal) +

                    "\n";

            });


            const subject =
                "New GlamWithFahve Order";


            const body =

                "NEW GLAMWITHFAHVE ORDER\n\n" +

                "CUSTOMER DETAILS\n" +

                "Name: " +
                customerName +
                "\n" +

                "Email: " +
                customerEmail +
                "\n" +

                "Phone: " +
                customerPhone +
                "\n\n" +


                "DELIVERY DETAILS\n" +

                "Address: " +
                deliveryAddress +
                "\n" +

                "City: " +
                city +
                "\n" +

                "State: " +
                state +
                "\n\n" +


                "ORDER DETAILS\n" +

                orderDetails +

                "\nTOTAL: " +

                formatMoney(total) +

                "\n\n" +

                "Additional Instructions: " +

                instructions;


            const mailto =

                "mailto:elochukwufavour975@gmail.com" +

                "?subject=" +

                encodeURIComponent(subject) +

                "&body=" +

                encodeURIComponent(body);


            window.location.href =
                mailto;


            /*
                Clear cart after order.
                This means refreshing the page
                also starts with an empty cart.
            */


            cart = [];

            updateCart();


            document
                .getElementById("checkoutForm")
                .reset();


            closeCheckout();


            alert(
                "Your order has been prepared. " +
                "Please send the email that opens."
            );

        }
    );


/* ================= INITIAL CART ================= */

updateCart();