/* =====================================================
   SWEET HAVEN - CAKE ORDERING SYSTEM
   ===================================================== */


/* ================= DEFAULT CAKES ================= */

let cakes = JSON.parse(localStorage.getItem("cakes")) || [

    {
        id: 1,
        name: "Chocolate Truffle Cake",
        category: "Chocolate",
        subCategory: "Premium",
        price: 850,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        description: "Rich chocolate cake with smooth chocolate cream."
    },

    {
        id: 2,
        name: "Strawberry Cream Cake",
        category: "Fruit",
        subCategory: "Classic",
        price: 650,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
        description: "Fresh strawberry cake with delicious cream."
    },

    {
        id: 3,
        name: "Birthday Vanilla Cake",
        category: "Birthday",
        subCategory: "Classic",
        price: 500,
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
        description: "Soft vanilla cake perfect for birthday celebrations."
    },

    {
        id: 4,
        name: "Wedding Red Velvet",
        category: "Wedding",
        subCategory: "Premium",
        price: 1400,
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f",
        description: "Premium red velvet cake for special occasions."
    },

    {
        id: 5,
        name: "Eggless Black Forest",
        category: "Chocolate",
        subCategory: "Eggless",
        price: 750,
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d",
        description: "Delicious eggless black forest cake."
    },

    {
        id: 6,
        name: "Mango Celebration Cake",
        category: "Fruit",
        subCategory: "Classic",
        price: 900,
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
        description: "Sweet mango cake made for celebrations."
    }

];


let cart = JSON.parse(localStorage.getItem("cart")) || [];

let orders = JSON.parse(localStorage.getItem("orders")) || [];

let currentUser =
    JSON.parse(localStorage.getItem("currentUser")) || null;


/* ================= INITIAL LOAD ================= */

document.addEventListener("DOMContentLoaded", function () {

    displayCakes();

    displayCart();

    displayOrders();

    updateCartCount();

    loadAdminData();

});


/* ================= DISPLAY CAKES ================= */

function displayCakes(list = cakes) {

    const cakeList = document.getElementById("cakeList");

    if (!cakeList) return;

    cakeList.innerHTML = "";

    if (list.length === 0) {

        cakeList.innerHTML =
            `<p class="empty">No cakes found.</p>`;

        return;
    }


    list.forEach(function (cake) {

        cakeList.innerHTML += `

            <div class="cake-card">

                <img
                    src="${cake.image}"
                    alt="${cake.name}"
                >

                <div class="cake-content">

                    <span class="category">
                        ${cake.category}
                    </span>

                    <h3>${cake.name}</h3>

                    <p>
                        ${cake.description}
                    </p>

                    <div class="price">
                        ₹${cake.price}
                    </div>

                    <button onclick="addToCart(${cake.id})">
                        Add to Cart
                    </button>

                </div>

            </div>

        `;

    });

}


/* ================= SEARCH + FILTER ================= */

function filterCakes() {

    const search =
        document
        .getElementById("searchCake")
        .value
        .toLowerCase();

    const category =
        document
        .getElementById("categoryFilter")
        .value;

    const subCategory =
        document
        .getElementById("subCategoryFilter")
        .value;

    const price =
        document
        .getElementById("priceFilter")
        .value;


    const filtered = cakes.filter(function (cake) {

        const matchesSearch =
            cake.name
            .toLowerCase()
            .includes(search);


        const matchesCategory =
            category === "all" ||
            cake.category === category;


        const matchesSubCategory =
            subCategory === "all" ||
            cake.subCategory === subCategory;


        let matchesPrice = true;


        if (price === "500") {

            matchesPrice = cake.price < 500;

        }
        else if (price === "1000") {

            matchesPrice =
                cake.price >= 500 &&
                cake.price <= 1000;

        }
        else if (price === "1500") {

            matchesPrice = cake.price > 1000;

        }


        return (
            matchesSearch &&
            matchesCategory &&
            matchesSubCategory &&
            matchesPrice
        );

    });


    displayCakes(filtered);

}


/* ================= CART ================= */

function addToCart(id) {

    const cake = cakes.find(function (item) {

        return item.id === id;

    });


    if (!cake) return;


    const existing =
        cart.find(function (item) {

            return item.id === id;

        });


    if (existing) {

        existing.quantity++;

    }
    else {

        cart.push({

            ...cake,
            quantity: 1

        });

    }


    saveCart();

    displayCart();

    updateCartCount();

    alert(cake.name + " added to cart!");

}


function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems || !cartTotal) return;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty">Your cart is empty.</p>`;

        cartTotal.textContent = "0";

        return;

    }


    let total = 0;


    cart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <h3>${item.name}</h3>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                </div>

                <div>

                    <strong>
                        ₹${itemTotal}
                    </strong>

                    <button
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    cartTotal.textContent = total;

}


function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();

}


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const element =
        document.getElementById("cartCount");


    if (element) {

        element.textContent = count;

    }

}


/* ================= REGISTER ================= */

function studentRegister() {

    const name =
        document.getElementById("registerName").value;

    const email =
        document.getElementById("registerEmail").value;

    const password =
        document.getElementById("registerPassword").value;


    if (!name || !email || !password) {

        document.getElementById("registerMessage")
            .textContent =
            "Please fill all registration fields.";

        return;

    }


    const user = {

        name: name,
        email: email,
        password: password

    };


    localStorage.setItem(
        "student",
        JSON.stringify(user)
    );


    document.getElementById("registerMessage")
        .textContent =
        "Registration successful! You can now login.";

}


/* ================= LOGIN ================= */

function studentLogin() {

    const name =
        document.getElementById("loginName").value;

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;


    const student =
        JSON.parse(
            localStorage.getItem("student")
        );


    if (!student) {

        document.getElementById("loginMessage")
            .textContent =
            "Please register first.";

        return;

    }


    if (
        email === student.email &&
        password === student.password
    ) {

        currentUser = student;


        localStorage.setItem(
            "currentUser",
            JSON.stringify(student)
        );


        document.getElementById("loginMessage")
            .textContent =
            "Login successful!";


    }
    else {

        document.getElementById("loginMessage")
            .textContent =
            "Invalid email or password.";

    }

}


/* ================= SHIPPING ADDRESS ================= */

function saveAddress() {

    const name =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("customerPhone").value;

    const address =
        document.getElementById("shippingAddress").value;

    const location =
        document.getElementById("shippingLocation").value;


    if (!name || !phone || !address || !location) {

        document.getElementById("addressMessage")
            .textContent =
            "Please fill all shipping details.";

        return;

    }


    const shipping = {

        name,
        phone,
        address,
        location

    };


    localStorage.setItem(
        "shippingAddress",
        JSON.stringify(shipping)
    );


    document.getElementById("addressMessage")
        .textContent =
        "Shipping address saved successfully.";

}


/* ================= PLACE ORDER ================= */

function placeOrder() {

    if (cart.length === 0) {

        alert("Please add a cake to your cart first.");

        return;

    }


    const shipping =
        JSON.parse(
            localStorage.getItem("shippingAddress")
        );


    if (!shipping) {

        alert(
            "Please enter and save your shipping address first."
        );

        return;

    }


    let total = 0;


    cart.forEach(function (item) {

        total +=
            item.price * item.quantity;

    });


    const order = {

        id:
            "ORD" +
            Date.now()
            .toString()
            .slice(-6),

        customer:
            currentUser
            ? currentUser.name
            : shipping.name,

        items: [...cart],

        total: total,

        shipping: shipping,

        status: "Order Placed",

        date:
            new Date().toLocaleDateString()

    };


    orders.push(order);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    cart = [];


    saveCart();

    displayCart();

    updateCartCount();

    displayOrders();

    loadAdminData();


    alert(
        "Order placed successfully! Order ID: " +
        order.id
    );

}


/* ================= MY ORDERS ================= */

function displayOrders() {

    const orderList =
        document.getElementById("orderList");


    if (!orderList) return;


    orderList.innerHTML = "";


    if (orders.length === 0) {

        orderList.innerHTML =
            `<p class="empty">
                No orders placed yet.
            </p>`;

        return;

    }


    orders.forEach(function (order) {

        let items = "";


        order.items.forEach(function (item) {

            items +=
                `${item.name} × ${item.quantity}<br>`;

        });


        orderList.innerHTML += `

            <div class="order-card">

                <h3>
                    Order ID: ${order.id}
                </h3>

                <p>
                    <strong>Date:</strong>
                    ${order.date}
                </p>

                <p>
                    <strong>Cakes:</strong><br>
                    ${items}
                </p>

                <p>
                    <strong>Amount:</strong>
                    ₹${order.total}
                </p>

                <p>
                    <strong>Shipping:</strong>
                    ${order.shipping.location}
                </p>

                <span class="status">
                    ${order.status}
                </span>

            </div>

        `;

    });

}


/* ================= ADMIN LOGIN ================= */

function adminLogin() {

    const username =
        document.getElementById("adminUsername").value;

    const password =
        document.getElementById("adminPassword").value;


    if (
        username === "admin" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );


        document.getElementById("adminMessage")
            .textContent =
            "Admin login successful.";


        document
            .getElementById("adminPanel")
            .classList
            .remove("hidden");


        loadAdminData();

    }
    else {

        document.getElementById("adminMessage")
            .textContent =
            "Invalid admin username or password.";

    }

}


/* ================= ADMIN LOGOUT ================= */

function adminLogout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );


    document
        .getElementById("adminPanel")
        .classList
        .add("hidden");


    document.getElementById("adminMessage")
        .textContent =
        "Admin logged out.";

}


/* ================= ADD PRODUCT ================= */

function addProduct() {

    const name =
        document.getElementById("productName").value;

    const category =
        document.getElementById("productCategory").value;

    const subCategory =
        document.getElementById("productSubCategory").value;

    const price =
        Number(
            document.getElementById("productPrice").value
        );

    const image =
        document.getElementById("productImage").value;

    const description =
        document.getElementById("productDescription").value;


    if (
        !name ||
        !price ||
        !description
    ) {

        alert("Please fill product details.");

        return;

    }


    const newProduct = {

        id: Date.now(),

        name: name,

        category: category,

        subCategory: subCategory,

        price: price,

        image:
            image ||
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587",

        description: description

    };


    cakes.push(newProduct);


    localStorage.setItem(
        "cakes",
        JSON.stringify(cakes)
    );


    displayCakes();

    loadAdminData();


    document.getElementById("productName").value = "";

    document.getElementById("productPrice").value = "";

    document.getElementById("productImage").value = "";

    document.getElementById("productDescription").value = "";


    alert("Cake added successfully.");

}


/* ================= ADMIN DATA ================= */

function loadAdminData() {

    const totalProducts =
        document.getElementById("totalProducts");

    const totalOrders =
        document.getElementById("totalOrders");

    const totalRevenue =
        document.getElementById("totalRevenue");


    if (
        !totalProducts ||
        !totalOrders ||
        !totalRevenue
    ) {
        return;
    }


    totalProducts.textContent =
        cakes.length;

    totalOrders.textContent =
        orders.length;


    const revenue =
        orders.reduce(
            (total, order) =>
                total + order.total,
            0
        );


    totalRevenue.textContent =
        "₹" + revenue;


    displayAdminProducts();

    displayAdminOrders();


    if (
        localStorage.getItem(
            "adminLoggedIn"
        ) === "true"
    ) {

        document
            .getElementById("adminPanel")
            .classList
            .remove("hidden");

    }

}


/* ================= ADMIN PRODUCTS ================= */

function displayAdminProducts() {

    const container =
        document.getElementById("adminProducts");


    if (!container) return;


    container.innerHTML = "";


    cakes.forEach(function (cake) {

        container.innerHTML += `

            <div class="admin-product">

                <h3>${cake.name}</h3>

                <p>
                    Category:
                    ${cake.category}
                </p>

                <p>
                    Price:
                    ₹${cake.price}
                </p>

                <button
                    onclick="deleteProduct(${cake.id})"
                >
                    Delete
                </button>

            </div>

        `;

    });

}


/* ================= DELETE PRODUCT ================= */

function deleteProduct(id) {

    cakes =
        cakes.filter(function (cake) {

            return cake.id !== id;

        });


    localStorage.setItem(
        "cakes",
        JSON.stringify(cakes)
    );


    displayCakes();

    loadAdminData();

}


/* ================= ADMIN ORDERS ================= */

function displayAdminOrders() {

    const container =
        document.getElementById("adminOrders");


    if (!container) return;


    container.innerHTML = "";


    if (orders.length === 0) {

        container.innerHTML =
            "<p>No orders available.</p>";

        return;

    }


    orders.forEach(function (order, index) {

        container.innerHTML += `

            <div class="admin-order">

                <h3>
                    ${order.id}
                </h3>

                <p>
                    Customer:
                    ${order.customer}
                </p>

                <p>
                    Location:
                    ${order.shipping.location}
                </p>

                <p>
                    Amount:
                    ₹${order.total}
                </p>

                <p>
                    Current Status:
                    <strong>
                        ${order.status}
                    </strong>
                </p>


                <select
                    onchange="
                        updateOrderStatus(
                            ${index},
                            this.value
                        )
                    "
                >

                    <option
                        value="Order Placed"
                        ${order.status === "Order Placed" ? "selected" : ""}
                    >
                        Order Placed
                    </option>

                    <option
                        value="Preparing"
                        ${order.status === "Preparing" ? "selected" : ""}
                    >
                        Preparing
                    </option>

                    <option
                        value="Out for Delivery"
                        ${order.status === "Out for Delivery" ? "selected" : ""}
                    >
                        Out for Delivery
                    </option>

                    <option
                        value="Delivered"
                        ${order.status === "Delivered" ? "selected" : ""}
                    >
                        Delivered
                    </option>

                </select>

            </div>

        `;

    });

}


/* ================= UPDATE ORDER ================= */

function updateOrderStatus(index, status) {

    orders[index].status = status;


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    displayOrders();

    displayAdminOrders();


    alert(
        "Order status updated to: " +
        status
    );

}


/* ================= SHOW SECTION ================= */

function showSection(id) {

    const section =
        document.getElementById(id);


    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}