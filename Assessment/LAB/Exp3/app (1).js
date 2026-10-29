/* =========================================================
   GOBUS - APPLICATION
========================================================= */


/* =========================================================
   STORAGE KEYS
========================================================= */

const STORAGE = {

    users: "gobus_users",
    buses: "gobus_buses",
    bookings: "gobus_bookings",
    comments: "gobus_comments",
    news: "gobus_news",
    currentUser: "gobus_current_user"

};


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentUser = null;

let currentSearch = {
    from: "",
    to: "",
    date: "",
    time: "all"
};

let currentBus = null;

let selectedSeats = [];

let currentBooking = null;

let editingBusId = null;


/* =========================================================
   DEFAULT BUS DATA
========================================================= */

const defaultBuses = [

    {
        id: "BUS001",
        name: "GreenLine Express",
        type: "Volvo AC",
        from: "Chennai",
        to: "Bangalore",
        departure: "06:30",
        arrival: "13:15",
        price: 699,
        seats: 36,
        bookedSeats: [2, 5, 8, 14, 17, 22],
        rating: 4.8,
        reviews: 326,
        image:
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
        description:
            "Premium air-conditioned Volvo service with spacious seats, charging points and comfortable long-distance travel."
    },

    {
        id: "BUS002",
        name: "Royal Sleeper",
        type: "Sleeper",
        from: "Chennai",
        to: "Bangalore",
        departure: "21:00",
        arrival: "05:30",
        price: 899,
        seats: 30,
        bookedSeats: [1, 4, 7, 10, 12, 16, 21],
        rating: 4.7,
        reviews: 241,
        image:
            "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80",
        description:
            "Comfortable sleeper coach designed for overnight travel with individual sleeping berths."
    },

    {
        id: "BUS003",
        name: "CityRide Premium",
        type: "Coach",
        from: "Chennai",
        to: "Bangalore",
        departure: "14:30",
        arrival: "21:15",
        price: 549,
        seats: 40,
        bookedSeats: [3, 9, 11, 15, 25, 29],
        rating: 4.5,
        reviews: 182,
        image:
            "https://images.unsplash.com/photo-1610557892470-a2f1f0d1d7e0?auto=format&fit=crop&w=900&q=80",
        description:
            "Affordable premium coach service suitable for students, families and regular travellers."
    },

    {
        id: "BUS004",
        name: "SouthStar Travels",
        type: "Volvo AC",
        from: "Chennai",
        to: "Coimbatore",
        departure: "07:15",
        arrival: "13:00",
        price: 649,
        seats: 36,
        bookedSeats: [1, 6, 12, 18, 20, 27],
        rating: 4.8,
        reviews: 412,
        image:
            "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=900&q=80",
        description:
            "Premium Volvo AC bus with comfortable reclining seats and smooth highway travel."
    },

    {
        id: "BUS005",
        name: "NightStar Sleeper",
        type: "Sleeper",
        from: "Chennai",
        to: "Coimbatore",
        departure: "22:30",
        arrival: "05:30",
        price: 799,
        seats: 30,
        bookedSeats: [2, 3, 8, 11, 14, 19],
        rating: 4.6,
        reviews: 165,
        image:
            "https://images.unsplash.com/photo-1610557892470-a2f1f0d1d7e0?auto=format&fit=crop&w=900&q=80",
        description:
            "Overnight sleeper service with comfortable berths and onboard charging."
    },

    {
        id: "BUS006",
        name: "Deccan Express",
        type: "Coach",
        from: "Bangalore",
        to: "Hyderabad",
        departure: "08:00",
        arrival: "17:00",
        price: 799,
        seats: 40,
        bookedSeats: [4, 7, 13, 16, 23],
        rating: 4.5,
        reviews: 197,
        image:
            "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=900&q=80",
        description:
            "Reliable interstate coach service connecting Bangalore and Hyderabad."
    },

    {
        id: "BUS007",
        name: "Royal Karnataka",
        type: "Volvo AC",
        from: "Bangalore",
        to: "Hyderabad",
        departure: "20:00",
        arrival: "06:00",
        price: 999,
        seats: 36,
        bookedSeats: [2, 5, 10, 14, 19, 24],
        rating: 4.9,
        reviews: 351,
        image:
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
        description:
            "Premium overnight Volvo AC service for comfortable interstate travel."
    },

    {
        id: "BUS008",
        name: "Tamil Express",
        type: "Coach",
        from: "Chennai",
        to: "Madurai",
        departure: "15:00",
        arrival: "21:30",
        price: 599,
        seats: 40,
        bookedSeats: [1, 5, 8, 16, 19, 31],
        rating: 4.4,
        reviews: 133,
        image:
            "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80",
        description:
            "Comfortable coach service connecting Chennai and Madurai."
    },

    {
        id: "BUS009",
        name: "Pondy Breeze",
        type: "Coach",
        from: "Chennai",
        to: "Pondicherry",
        departure: "09:00",
        arrival: "12:00",
        price: 399,
        seats: 40,
        bookedSeats: [3, 6, 12, 22],
        rating: 4.3,
        reviews: 98,
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        description:
            "Affordable short-distance service between Chennai and Pondicherry."
    },

    {
        id: "BUS010",
        name: "Trichy Connect",
        type: "Volvo AC",
        from: "Chennai",
        to: "Trichy",
        departure: "19:30",
        arrival: "01:00",
        price: 699,
        seats: 36,
        bookedSeats: [2, 9, 13, 17, 28],
        rating: 4.6,
        reviews: 154,
        image:
            "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=900&q=80",
        description:
            "Comfortable evening Volvo service for Chennai to Trichy."
    }

];


/* =========================================================
   DEFAULT USERS
========================================================= */

const defaultUsers = [

    {
        id: "USR001",
        name: "Demo User",
        email: "user@gobus.com",
        password: "user123",
        phone: "9876543210",
        city: "Chennai",
        role: "user",
        joined: "2026-01-10"
    },

    {
        id: "ADM001",
        name: "Administrator",
        email: "admin@gobus.com",
        password: "admin123",
        phone: "9999999999",
        city: "Chennai",
        role: "admin",
        joined: "2025-12-01"
    }

];


/* =========================================================
   DEFAULT NEWS
========================================================= */

const defaultNews = [

    {
        id: "NEWS001",
        title: "Welcome to GoBus",
        content:
            "Book your bus journey easily and manage all your trips from one place.",
        date: "2026-10-01"
    },

    {
        id: "NEWS002",
        title: "New routes available",
        content:
            "More South Indian routes are now available on the GoBus platform.",
        date: "2026-10-10"
    }

];


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeStorage();

    setMinimumDate();

    attachEventListeners();

    restoreLogin();

    window.addEventListener("scroll", handleNavbar);

});


function initializeStorage() {

    if (!localStorage.getItem(STORAGE.users)) {

        localStorage.setItem(
            STORAGE.users,
            JSON.stringify(defaultUsers)
        );

    }

    if (!localStorage.getItem(STORAGE.buses)) {

        localStorage.setItem(
            STORAGE.buses,
            JSON.stringify(defaultBuses)
        );

    }

    if (!localStorage.getItem(STORAGE.bookings)) {

        localStorage.setItem(
            STORAGE.bookings,
            JSON.stringify([])
        );

    }

    if (!localStorage.getItem(STORAGE.comments)) {

        localStorage.setItem(
            STORAGE.comments,
            JSON.stringify([])
        );

    }

    if (!localStorage.getItem(STORAGE.news)) {

        localStorage.setItem(
            STORAGE.news,
            JSON.stringify(defaultNews)
        );

    }

}


/* =========================================================
   HELPERS
========================================================= */

function getUsers() {

    return JSON.parse(
        localStorage.getItem(STORAGE.users) || "[]"
    );

}


function saveUsers(users) {

    localStorage.setItem(
        STORAGE.users,
        JSON.stringify(users)
    );

}


function getBuses() {

    return JSON.parse(
        localStorage.getItem(STORAGE.buses) || "[]"
    );

}


function saveBuses(buses) {

    localStorage.setItem(
        STORAGE.buses,
        JSON.stringify(buses)
    );

}


function getBookings() {

    return JSON.parse(
        localStorage.getItem(STORAGE.bookings) || "[]"
    );

}


function saveBookings(bookings) {

    localStorage.setItem(
        STORAGE.bookings,
        JSON.stringify(bookings)
    );

}


function getComments() {

    return JSON.parse(
        localStorage.getItem(STORAGE.comments) || "[]"
    );

}


function saveComments(comments) {

    localStorage.setItem(
        STORAGE.comments,
        JSON.stringify(comments)
    );

}


function getNews() {

    return JSON.parse(
        localStorage.getItem(STORAGE.news) || "[]"
    );

}


function saveNews(news) {

    localStorage.setItem(
        STORAGE.news,
        JSON.stringify(news)
    );

}


function generateId(prefix) {

    return (
        prefix +
        Date.now().toString(36).toUpperCase() +
        Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase()
    );

}


function formatCurrency(amount) {

    return "₹" + Number(amount).toLocaleString("en-IN");

}


function formatDate(dateString) {

    if (!dateString) return "-";

    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function formatTime(time) {

    if (!time) return "-";

    const [hour, minute] = time.split(":");

    const date = new Date();

    date.setHours(Number(hour));
    date.setMinutes(Number(minute));

    return date.toLocaleTimeString(
        "en-IN",
        {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }
    );

}


function getDuration(start, end) {

    let [h1, m1] = start.split(":").map(Number);
    let [h2, m2] = end.split(":").map(Number);

    let startMinutes = h1 * 60 + m1;
    let endMinutes = h2 * 60 + m2;

    if (endMinutes < startMinutes) {

        endMinutes += 24 * 60;

    }

    const diff = endMinutes - startMinutes;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}h ${minutes}m`;

}


function getTimeCategory(time) {

    const hour = Number(time.split(":")[0]);

    if (hour >= 5 && hour < 12) {
        return "morning";
    }

    if (hour >= 12 && hour < 17) {
        return "afternoon";
    }

    if (hour >= 17 && hour < 21) {
        return "evening";
    }

    return "night";

}


function getInitials(name) {

    if (!name) return "U";

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = "success") {

    const container =
        document.getElementById("toastContainer");

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `

        <i class="fa-solid ${
            type === "success"
                ? "fa-circle-check"
                : "fa-circle-exclamation"
        }"></i>

        <span>${escapeHTML(message)}</span>

    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3500);

}


/* =========================================================
   NAVBAR
========================================================= */

function handleNavbar() {

    const navbar =
        document.getElementById("mainNavbar");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


function toggleMobileMenu() {

    document
        .getElementById("mobileMenu")
        .classList.toggle("show");

}


function closeMobileMenu() {

    document
        .getElementById("mobileMenu")
        .classList.remove("show");

}


/* =========================================================
   DATE
========================================================= */

function setMinimumDate() {

    const dateInput =
        document.getElementById("travelDate");

    if (!dateInput) return;

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    dateInput.min = today;

    dateInput.value = today;

}


/* =========================================================
   HOME
========================================================= */

function showHome() {

    hideAllMainPages();

    document
        .getElementById("homePage")
        .classList.remove("hidden");

    closeMobileMenu();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function hideAllMainPages() {

    document
        .getElementById("homePage")
        .classList.add("hidden");

    document
        .getElementById("resultsPage")
        .classList.add("hidden");

    document
        .getElementById("userApp")
        .classList.add("hidden");

    document
        .getElementById("adminApp")
        .classList.add("hidden");

}


/* =========================================================
   SEARCH
========================================================= */

function attachEventListeners() {

    document
        .getElementById("searchForm")
        .addEventListener(
            "submit",
            handleSearch
        );


    document
        .getElementById("loginForm")
        .addEventListener(
            "submit",
            handleLogin
        );


    document
        .getElementById("registerForm")
        .addEventListener(
            "submit",
            handleRegister
        );


    document
        .getElementById("forgotForm")
        .addEventListener(
            "submit",
            handleForgotPassword
        );


    document
        .getElementById("bookingForm")
        .addEventListener(
            "submit",
            handleBookingSubmit
        );


    document
        .getElementById("paymentForm")
        .addEventListener(
            "submit",
            handlePayment
        );


    document
        .getElementById("profileForm")
        .addEventListener(
            "submit",
            handleProfileUpdate
        );


    document
        .getElementById("passwordForm")
        .addEventListener(
            "submit",
            handlePasswordChange
        );


    document
        .getElementById("commentForm")
        .addEventListener(
            "submit",
            handleCommentSubmit
        );


    document
        .getElementById("busForm")
        .addEventListener(
            "submit",
            handleBusSubmit
        );


    document
        .getElementById("newsForm")
        .addEventListener(
            "submit",
            handleNewsSubmit
        );


    document
        .querySelectorAll(".type-filter")
        .forEach(input => {

            input.addEventListener(
                "change",
                renderBusResults
            );

        });


    document
        .querySelectorAll(
            'input[name="timeFilter"]'
        )
        .forEach(input => {

            input.addEventListener(
                "change",
                renderBusResults
            );

        });


    document
        .querySelectorAll(
            ".rating-input button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                handleRatingClick
            );

        });


    document
        .querySelectorAll(".payment-method")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".payment-method")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );

                    button.classList.add("active");

                }
            );

        });


    document
        .getElementById("cardNumber")
        .addEventListener(
            "input",
            formatCardNumber
        );

}


function handleSearch(event) {

    event.preventDefault();

    const from =
        document.getElementById("fromCity").value;

    const to =
        document.getElementById("toCity").value;

    const date =
        document.getElementById("travelDate").value;

    const time =
        document.getElementById("departureTime").value;

    if (!from || !to) {

        showToast(
            "Please select both departure and destination.",
            "error"
        );

        return;

    }

    if (from === to) {

        showToast(
            "Departure and destination cannot be the same.",
            "error"
        );

        return;

    }

    currentSearch = {
        from,
        to,
        date,
        time
    };

    showResultsPage();

}


function quickRoute(from, to) {

    document.getElementById("fromCity").value = from;

    document.getElementById("toCity").value = to;

    const date =
        new Date()
            .toISOString()
            .split("T")[0];

    document.getElementById("travelDate").value = date;

    currentSearch = {
        from,
        to,
        date,
        time: "all"
    };

    showResultsPage();

}


function searchCategory(type) {

    const buses =
        getBuses().filter(
            bus => bus.type === type
        );

    if (!buses.length) {

        showToast(
            "No buses are currently available for this category.",
            "error"
        );

        return;

    }

    currentSearch = {
        from: "",
        to: "",
        date:
            new Date()
                .toISOString()
                .split("T")[0],
        time: "all"
    };

    showResultsPage(type);

}


function swapCities() {

    const from =
        document.getElementById("fromCity");

    const to =
        document.getElementById("toCity");

    const temporary = from.value;

    from.value = to.value;

    to.value = temporary;

}


/* =========================================================
   RESULTS
========================================================= */

function showResultsPage(category = null) {

    hideAllMainPages();

    document
        .getElementById("resultsPage")
        .classList.remove("hidden");

    const title =
        document.getElementById("resultsTitle");

    if (category) {

        title.textContent =
            `${category} buses`;

    } else {

        title.textContent =
            `${currentSearch.from} → ${currentSearch.to}`;

    }

    document.getElementById("resultsSubtitle").textContent =
        category
            ? `Showing available ${category} services.`
            : "Select a bus that fits your journey.";

    document.getElementById("resultsDate").textContent =
        formatDate(currentSearch.date);

    renderBusResults();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function renderBusResults() {

    const container =
        document.getElementById("busResults");

    const count =
        document.getElementById("resultCount");

    let buses = getBuses();

    const categoryTitle =
        document
            .getElementById("resultsTitle")
            .textContent;

    if (
        !categoryTitle.toLowerCase().includes("buses")
        &&
        currentSearch.from
    ) {

        buses = buses.filter(
            bus =>
                bus.from.toLowerCase() ===
                currentSearch.from.toLowerCase()
                &&
                bus.to.toLowerCase() ===
                currentSearch.to.toLowerCase()
        );

    }


    if (
        categoryTitle.toLowerCase().includes("volvo ac")
        ||
        categoryTitle.toLowerCase().includes("sleeper")
        ||
        categoryTitle.toLowerCase().includes("coach")
    ) {

        const category =
            categoryTitle
                .replace(" buses", "");

        buses = buses.filter(
            bus =>
                bus.type.toLowerCase() ===
                category.toLowerCase()
        );

    }


    const checkedTypes =
        [
            ...document.querySelectorAll(
                ".type-filter:checked"
            )
        ].map(input => input.value);

    if (checkedTypes.length) {

        buses = buses.filter(
            bus =>
                checkedTypes.includes(bus.type)
        );

    }


    const timeFilter =
        document.querySelector(
            'input[name="timeFilter"]:checked'
        )?.value || "all";

    if (timeFilter !== "all") {

        buses = buses.filter(
            bus =>
                getTimeCategory(bus.departure) ===
                timeFilter
        );

    }


    const price =
        Number(
            document.getElementById("priceFilter").value
        );

    buses = buses.filter(
        bus =>
            Number(bus.price) <= price
    );


    const sort =
        document.getElementById("sortBuses").value;

    if (sort === "priceLow") {

        buses.sort(
            (a, b) => a.price - b.price
        );

    }

    if (sort === "priceHigh") {

        buses.sort(
            (a, b) => b.price - a.price
        );

    }

    if (sort === "departure") {

        buses.sort(
            (a, b) =>
                a.departure.localeCompare(
                    b.departure
                )
        );

    }


    count.textContent =
        `${buses.length} bus${buses.length === 1 ? "" : "es"} found`;


    if (!buses.length) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-bus"></i>

                <h3>No buses found</h3>

                <p>
                    Try changing your route or filters.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        buses.map(bus =>
            createBusResultCard(bus)
        ).join("");

}


function createBusResultCard(bus) {

    const available =
        bus.seats -
        (bus.bookedSeats || []).length;

    return `

        <div class="bus-result-card">

            <div class="bus-main">

                <div class="bus-company">

                    <img
                        src="${escapeHTML(bus.image)}"
                        class="bus-company-logo"
                        alt="${escapeHTML(bus.name)}"
                    >

                    <div>

                        <h3>
                            ${escapeHTML(bus.name)}
                        </h3>

                        <p>
                            ${escapeHTML(bus.from)}
                            →
                            ${escapeHTML(bus.to)}
                        </p>

                        <span class="bus-type">
                            ${escapeHTML(bus.type)}
                        </span>

                    </div>

                </div>


                <div class="bus-timing">

                    <div class="bus-time">

                        <strong>
                            ${formatTime(bus.departure)}
                        </strong>

                        <span>
                            ${escapeHTML(bus.from)}
                        </span>

                    </div>

                    <div>

                        <div class="route-line"></div>

                        <div class="bus-duration">
                            ${getDuration(
                                bus.departure,
                                bus.arrival
                            )}
                        </div>

                    </div>

                    <div class="bus-time">

                        <strong>
                            ${formatTime(bus.arrival)}
                        </strong>

                        <span>
                            ${escapeHTML(bus.to)}
                        </span>

                    </div>

                </div>


                <div>

                    <div class="bus-price">

                        <span>Starting from</span>

                        <strong>
                            ${formatCurrency(bus.price)}
                        </strong>

                        <small>
                            ${available} seats left
                        </small>

                    </div>

                </div>

            </div>


            <div class="bus-actions">

                <button
                    class="small-btn"
                    onclick="openBusDetails('${bus.id}')"
                >
                    View details
                </button>

                <button
                    class="small-btn primary"
                    onclick="startSeatSelection('${bus.id}')"
                >
                    Select seats
                    <i class="fa-solid fa-arrow-right"></i>
                </button>

            </div>

        </div>

    `;

}


function updatePriceLabel() {

    const value =
        document.getElementById("priceFilter").value;

    document.getElementById("priceLabel").textContent =
        formatCurrency(value);

    renderBusResults();

}


function resetFilters() {

    document
        .querySelectorAll(".type-filter")
        .forEach(input => {
            input.checked = false;
        });

    document.querySelector(
        'input[name="timeFilter"][value="all"]'
    ).checked = true;

    document.getElementById("priceFilter").value = 2500;

    document.getElementById("priceLabel").textContent = "₹2500";

    renderBusResults();

}


/* =========================================================
   BUS DETAILS
========================================================= */

function openBusDetails(busId) {

    const bus =
        getBuses().find(
            item => item.id === busId
        );

    if (!bus) return;

    currentBus = bus;

    const available =
        bus.seats -
        (bus.bookedSeats || []).length;

    document.getElementById(
        "busDetailsContent"
    ).innerHTML = `

        <img
            src="${escapeHTML(bus.image)}"
            class="bus-detail-image"
            alt="${escapeHTML(bus.name)}"
        >

        <div class="detail-top">

            <div>

                <span class="eyebrow">
                    ${escapeHTML(bus.type)}
                </span>

                <h2>
                    ${escapeHTML(bus.name)}
                </h2>

            </div>

            <div class="detail-rating">

                <i class="fa-solid fa-star"></i>
                ${bus.rating}

                <small>
                    (${bus.reviews} reviews)
                </small>

            </div>

        </div>


        <div class="detail-route">

            <div>

                <span>Departure</span>

                <strong>
                    ${formatTime(bus.departure)}
                </strong>

                <span>
                    ${escapeHTML(bus.from)}
                </span>

            </div>

            <i class="fa-solid fa-arrow-right"></i>

            <div>

                <span>Arrival</span>

                <strong>
                    ${formatTime(bus.arrival)}
                </strong>

                <span>
                    ${escapeHTML(bus.to)}
                </span>

            </div>

        </div>


        <div class="detail-features">

            <span class="detail-feature">
                <i class="fa-solid fa-snowflake"></i>
                Air conditioning
            </span>

            <span class="detail-feature">
                <i class="fa-solid fa-bolt"></i>
                Charging point
            </span>

            <span class="detail-feature">
                <i class="fa-solid fa-wifi"></i>
                Wi-Fi
            </span>

            <span class="detail-feature">
                <i class="fa-solid fa-chair"></i>
                ${available} seats available
            </span>

        </div>


        <p style="
            color:#667085;
            font-size:13px;
            margin-bottom:20px;
        ">
            ${escapeHTML(bus.description)}
        </p>


        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
        ">

            <div>

                <span style="
                    color:#667085;
                    font-size:10px;
                ">
                    Starting from
                </span>

                <strong style="
                    display:block;
                    color:#101828;
                    font-size:24px;
                ">
                    ${formatCurrency(bus.price)}
                </strong>

            </div>

            <button
                class="primary-btn"
                onclick="closeModal('busDetailsModal'); startSeatSelection('${bus.id}')"
            >
                Select seats
                <i class="fa-solid fa-arrow-right"></i>
            </button>

        </div>

    `;

    openModal("busDetailsModal");

}


/* =========================================================
   SEAT SELECTION
========================================================= */

function startSeatSelection(busId) {

    if (!currentUser) {

        showToast(
            "Please login before booking a bus.",
            "error"
        );

        openLoginModal();

        return;

    }

    const bus =
        getBuses().find(
            item => item.id === busId
        );

    if (!bus) return;

    currentBus = bus;

    selectedSeats = [];

    openSeatSelectionModal();

}


function openSeatSelectionModal() {

    const modal =
        document.getElementById("busDetailsModal");

    const bus = currentBus;

    const totalSeats =
        Number(bus.seats);

    const booked =
        bus.bookedSeats || [];

    let seatsHTML = "";

    for (
        let seat = 1;
        seat <= totalSeats;
        seat++
    ) {

        if (seat % 4 === 3) {

            seatsHTML += `<div></div>`;

        }

        const isBooked =
            booked.includes(seat);

        seatsHTML += `

            <button
                class="seat ${
                    isBooked
                        ? "booked"
                        : "available"
                }"
                ${
                    isBooked
                        ? "disabled"
                        : `onclick="toggleSeat(${seat})"`
                }
                id="seat-${seat}"
            >
                ${seat}
            </button>

        `;

    }

    modal.querySelector(".modal").innerHTML = `

        <button
            class="modal-close"
            onclick="closeModal('busDetailsModal')"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="booking-header">

            <div>

                <span class="eyebrow">
                    ${escapeHTML(bus.type)}
                </span>

                <h2>
                    Select your seats
                </h2>

                <p style="
                    color:#667085;
                    font-size:11px;
                    margin-top:5px;
                ">
                    ${escapeHTML(bus.name)}
                    ·
                    ${escapeHTML(bus.from)}
                    →
                    ${escapeHTML(bus.to)}
                </p>

            </div>

            <div class="booking-step">
                ${bus.seats} seats
            </div>

        </div>

        <div class="seat-layout">

            <div class="seat-map-container">

                <div class="bus-front">
                    <i class="fa-solid fa-steering-wheel"></i>
                    FRONT OF BUS
                </div>

                <div class="seat-grid">

                    ${seatsHTML}

                </div>

                <div class="seat-legend">

                    <span>
                        <i class="legend-box"></i>
                        Available
                    </span>

                    <span>
                        <i class="legend-box selected"></i>
                        Selected
                    </span>

                    <span>
                        <i class="legend-box booked"></i>
                        Booked
                    </span>

                </div>

            </div>

            <div class="seat-summary">

                <h3>
                    Your selection
                </h3>

                <div
                    class="selected-seats"
                    id="selectedSeatsBox"
                >
                    Select your seats
                </div>

                <div class="summary-row">

                    <span>Seats</span>

                    <strong id="selectedSeatCount">
                        0
                    </strong>

                </div>

                <div class="summary-row">

                    <span>Price / seat</span>

                    <strong>
                        ${formatCurrency(bus.price)}
                    </strong>

                </div>

                <div class="summary-row total">

                    <span>Total</span>

                    <strong id="seatTotal">
                        ₹0
                    </strong>

                </div>

                <button
                    class="primary-btn full-btn"
                    style="margin-top:15px;"
                    onclick="continueToBooking()"
                >
                    Continue
                    <i class="fa-solid fa-arrow-right"></i>
                </button>

            </div>

        </div>

    `;

    openModal("busDetailsModal");

}


function toggleSeat(seatNumber) {

    if (selectedSeats.includes(seatNumber)) {

        selectedSeats =
            selectedSeats.filter(
                seat => seat !== seatNumber
            );

        document
            .getElementById(`seat-${seatNumber}`)
            .classList.remove("selected");

    } else {

        if (selectedSeats.length >= 6) {

            showToast(
                "You can select a maximum of 6 seats per booking.",
                "error"
            );

            return;

        }

        selectedSeats.push(seatNumber);

        document
            .getElementById(`seat-${seatNumber}`)
            .classList.add("selected");

    }

    updateSeatSummary();

}


function updateSeatSummary() {

    const box =
        document.getElementById("selectedSeatsBox");

    const count =
        document.getElementById("selectedSeatCount");

    const total =
        document.getElementById("seatTotal");

    if (!selectedSeats.length) {

        box.textContent =
            "Select your seats";

    } else {

        box.innerHTML =
            selectedSeats
                .sort((a,b) => a-b)
                .map(
                    seat =>
                        `<span class="selected-seat-tag">
                            Seat ${seat}
                        </span>`
                )
                .join("");

    }

    count.textContent =
        selectedSeats.length;

    total.textContent =
        formatCurrency(
            selectedSeats.length *
            Number(currentBus.price)
        );

}


/* =========================================================
   BOOKING
========================================================= */

function continueToBooking() {

    if (!selectedSeats.length) {

        showToast(
            "Please select at least one seat.",
            "error"
        );

        return;

    }

    closeModal("busDetailsModal");

    const bus = currentBus;

    document.getElementById(
        "bookingBusSummary"
    ).innerHTML = `

        <div class="booking-summary">

            <h3>
                ${escapeHTML(bus.name)}
            </h3>

            <p>
                ${escapeHTML(bus.from)}
                →
                ${escapeHTML(bus.to)}
                ·
                ${formatTime(bus.departure)}
                →
                ${formatTime(bus.arrival)}
            </p>

            <p>
                Seats:
                <strong>
                    ${selectedSeats.join(", ")}
                </strong>
            </p>

        </div>

    `;


    const fields =
        document.getElementById(
            "passengerFields"
        );

    fields.innerHTML =
        selectedSeats
            .map(
                (seat, index) => `

                    <div
                        style="
                            border:1px solid #e4e7ec;
                            padding:15px;
                            border-radius:12px;
                            margin-bottom:12px;
                        "
                    >

                        <strong style="
                            display:block;
                            font-size:12px;
                            margin-bottom:12px;
                        ">
                            Passenger ${index + 1}
                            · Seat ${seat}
                        </strong>

                        <div class="form-grid">

                            <div class="form-group">

                                <label>
                                    Passenger name
                                </label>

                                <input
                                    type="text"
                                    name="passengerName"
                                    required
                                    placeholder="Full name"
                                >

                            </div>

                            <div class="form-group">

                                <label>
                                    Age
                                </label>

                                <input
                                    type="number"
                                    name="passengerAge"
                                    min="1"
                                    max="100"
                                    required
                                    placeholder="Age"
                                >

                            </div>

                            <div class="form-group">

                                <label>
                                    Gender
                                </label>

                                <select
                                    name="passengerGender"
                                    required
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                `
            )
            .join("");


    document.getElementById(
        "bookingTotal"
    ).textContent =
        formatCurrency(
            selectedSeats.length *
            Number(bus.price)
        );

    openModal("bookingModal");

}


function handleBookingSubmit(event) {

    event.preventDefault();

    const form =
        document.getElementById("bookingForm");

    const formData =
        new FormData(form);

    const names =
        formData.getAll("passengerName");

    const ages =
        formData.getAll("passengerAge");

    const genders =
        formData.getAll("passengerGender");


    const passengers =
        selectedSeats.map(
            (seat, index) => ({

                seat,

                name: names[index],

                age: ages[index],

                gender: genders[index]

            })
        );


    currentBooking = {

        id: generateId("GB"),

        userId: currentUser.id,

        busId: currentBus.id,

        busName: currentBus.name,

        from: currentBus.from,

        to: currentBus.to,

        date:
            currentSearch.date ||
            new Date()
                .toISOString()
                .split("T")[0],

        departure: currentBus.departure,

        arrival: currentBus.arrival,

        seats: [...selectedSeats],

        passengers,

        amount:
            selectedSeats.length *
            Number(currentBus.price),

        status: "Confirmed",

        createdAt:
            new Date().toISOString()

    };


    closeModal("bookingModal");

    document.getElementById(
        "paymentAmount"
    ).textContent =
        formatCurrency(
            currentBooking.amount
        );

    openModal("paymentModal");

}


function handlePayment(event) {

    event.preventDefault();

    if (!currentBooking) return;

    const bookings = getBookings();

    bookings.push(currentBooking);

    saveBookings(bookings);


    const buses = getBuses();

    const bus =
        buses.find(
            item =>
                item.id === currentBooking.busId
        );

    if (bus) {

        bus.bookedSeats =
            [
                ...(bus.bookedSeats || []),
                ...currentBooking.seats
            ];

    }

    saveBuses(buses);


    closeModal("paymentModal");

    showBookingSuccess();

    currentBus =
        buses.find(
            item =>
                item.id === currentBooking.busId
        ) || currentBus;

}


function showBookingSuccess() {

    const booking =
        currentBooking;

    document.getElementById(
        "successBookingDetails"
    ).innerHTML = `

        <div class="success-booking-box">

            <div>

                <span>Booking ID</span>

                <strong>
                    ${escapeHTML(booking.id)}
                </strong>

            </div>

            <div>

                <span>Journey</span>

                <strong>
                    ${escapeHTML(booking.from)}
                    →
                    ${escapeHTML(booking.to)}
                </strong>

            </div>

            <div>

                <span>Date</span>

                <strong>
                    ${formatDate(booking.date)}
                </strong>

            </div>

            <div>

                <span>Seats</span>

                <strong>
                    ${booking.seats.join(", ")}
                </strong>

            </div>

            <div>

                <span>Amount</span>

                <strong>
                    ${formatCurrency(booking.amount)}
                </strong>

            </div>

        </div>

    `;

    openModal("successModal");

    showToast(
        "Booking confirmed successfully!"
    );

}


function goToMyBookings() {

    closeModal("successModal");

    if (!currentUser) {

        openLoginModal();

        return;

    }

    if (currentUser.role === "admin") {

        showAdminApp();

    } else {

        showUserApp();

        showUserSection("bookings");

    }

}


/* =========================================================
   AUTHENTICATION
========================================================= */

function openLoginModal() {

    closeAllModals();

    openModal("loginModal");

}


function switchToLogin() {

    closeAllModals();

    openModal("loginModal");

}


function switchToRegister() {

    closeAllModals();

    openModal("registerModal");

}


function switchToForgot() {

    closeAllModals();

    openModal("forgotModal");

}


function handleLogin(event) {

    event.preventDefault();

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    const users = getUsers();

    const user =
        users.find(
            item =>
                item.email.toLowerCase() === email
                &&
                item.password === password
        );


    if (!user) {

        showToast(
            "Invalid email or password.",
            "error"
        );

        return;

    }


    currentUser = user;

    localStorage.setItem(
        STORAGE.currentUser,
        JSON.stringify(user)
    );

    closeAllModals();

    showToast(
        `Welcome back, ${user.name}!`
    );


    if (user.role === "admin") {

        showAdminApp();

    } else {

        showUserApp();

    }

}


function handleRegister(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "registerName"
        ).value.trim();

    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim().toLowerCase();

    const phone =
        document.getElementById(
            "registerPhone"
        ).value.trim();

    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    const users = getUsers();

    const exists =
        users.some(
            user =>
                user.email.toLowerCase() ===
                email
        );


    if (exists) {

        showToast(
            "An account with this email already exists.",
            "error"
        );

        return;

    }


    const newUser = {

        id: generateId("USR"),

        name,

        email,

        password,

        phone,

        city: "",

        role: "user",

        joined:
            new Date()
                .toISOString()
                .split("T")[0]

    };


    users.push(newUser);

    saveUsers(users);

    currentUser = newUser;

    localStorage.setItem(
        STORAGE.currentUser,
        JSON.stringify(newUser)
    );

    closeAllModals();

    document
        .getElementById("registerForm")
        .reset();

    showToast(
        "Account created successfully!"
    );

    showUserApp();

}


function handleForgotPassword(event) {

    event.preventDefault();

    const email =
        document
            .getElementById("forgotEmail")
            .value
            .trim()
            .toLowerCase();

    const exists =
        getUsers().some(
            user =>
                user.email.toLowerCase() === email
        );


    closeModal("forgotModal");

    if (exists) {

        showToast(
            "Password reset link sent successfully."
        );

    } else {

        showToast(
            "If this email exists, a reset link has been sent."
        );

    }

}


function restoreLogin() {

    const saved =
        localStorage.getItem(
            STORAGE.currentUser
        );

    if (!saved) return;

    try {

        currentUser =
            JSON.parse(saved);

    } catch {

        currentUser = null;

    }

}


function logout() {

    currentUser = null;

    localStorage.removeItem(
        STORAGE.currentUser
    );

    showHome();

    showToast(
        "You have been logged out."
    );

}


/* =========================================================
   USER APP
========================================================= */

function showUserApp() {

    hideAllMainPages();

    document
        .getElementById("userApp")
        .classList.remove("hidden");

    updateUserDashboard();

    showUserSection("overview");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function updateUserDashboard() {

    if (!currentUser) return;

    const initials =
        getInitials(currentUser.name);

    document.getElementById(
        "userAvatar"
    ).textContent = initials;

    document.getElementById(
        "topAvatar"
    ).textContent = initials;

    document.getElementById(
        "profileAvatar"
    ).textContent = initials;

    document.getElementById(
        "sidebarUserName"
    ).textContent =
        currentUser.name;

    document.getElementById(
        "dashboardGreeting"
    ).textContent =
        `Welcome back, ${currentUser.name.split(" ")[0]}`;


    document.getElementById(
        "profileName"
    ).value =
        currentUser.name;

    document.getElementById(
        "profileEmail"
    ).value =
        currentUser.email;

    document.getElementById(
        "profilePhone"
    ).value =
        currentUser.phone || "";

    document.getElementById(
        "profileCity"
    ).value =
        currentUser.city || "";


    const bookings =
        getBookings().filter(
            booking =>
                booking.userId ===
                currentUser.id
        );


    const total =
        bookings.length;

    const completed =
        bookings.filter(
            booking =>
                booking.status === "Completed"
        ).length;

    const upcoming =
        bookings.filter(
            booking =>
                booking.status === "Confirmed"
        ).length;

    const spent =
        bookings.reduce(
            (sum, booking) =>
                sum + Number(booking.amount),
            0
        );


    document.getElementById(
        "totalBookingsStat"
    ).textContent = total;

    document.getElementById(
        "completedBookingsStat"
    ).textContent = completed;

    document.getElementById(
        "upcomingBookingsStat"
    ).textContent = upcoming;

    document.getElementById(
        "totalSpentStat"
    ).textContent =
        formatCurrency(spent);


    const upcomingBooking =
        bookings.find(
            booking =>
                booking.status === "Confirmed"
        );


    if (upcomingBooking) {

        document.getElementById(
            "nextTripTitle"
        ).textContent =
            `${upcomingBooking.from} → ${upcomingBooking.to}`;

        document.getElementById(
            "nextTripDetails"
        ).textContent =
            `${formatDate(upcomingBooking.date)} · ${formatTime(upcomingBooking.departure)} · Seat ${upcomingBooking.seats.join(", ")}`;

    } else {

        document.getElementById(
            "nextTripTitle"
        ).textContent =
            "No upcoming trip";

        document.getElementById(
            "nextTripDetails"
        ).textContent =
            "Book your next bus journey with GoBus.";

    }


    renderRecentBookings();

    renderUserBookings();

}


function showUserSection(section) {

    document
        .querySelectorAll(
            "#userApp .dashboard-section"
        )
        .forEach(element =>
            element.classList.remove("active")
        );

    const target =
        document.getElementById(
            `user-${section}`
        );

    if (target) {

        target.classList.add("active");

    }


    document
        .querySelectorAll(
            "#userApp .sidebar-link"
        )
        .forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.section === section
            );

        });


    updateUserDashboard();

}


function renderRecentBookings() {

    const container =
        document.getElementById(
            "recentBookings"
        );

    const bookings =
        getBookings()
            .filter(
                booking =>
                    booking.userId ===
                    currentUser.id
            )
            .slice(-5)
            .reverse();


    if (!bookings.length) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-ticket"></i>

                <h3>No bookings yet</h3>

                <p>
                    Your recent trips will appear here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        bookings
            .map(
                booking => `

                    <div class="booking-list-item">

                        <div class="booking-route">

                            <div>

                                <strong>
                                    ${escapeHTML(booking.from)}
                                    →
                                    ${escapeHTML(booking.to)}
                                </strong>

                                <span>
                                    ${formatDate(booking.date)}
                                    ·
                                    ${escapeHTML(booking.busName)}
                                </span>

                            </div>

                        </div>

                        <div class="booking-meta">

                            <div>

                                <span>Seats</span>

                                <strong>
                                    ${booking.seats.join(", ")}
                                </strong>

                            </div>

                            <div>

                                <span>Amount</span>

                                <strong>
                                    ${formatCurrency(booking.amount)}
                                </strong>

                            </div>

                            <span class="status ${
                                booking.status.toLowerCase()
                            }">
                                ${booking.status}
                            </span>

                        </div>

                    </div>

                `
            )
            .join("");

}


function renderUserBookings() {

    const container =
        document.getElementById(
            "userBookingsList"
        );

    const bookings =
        getBookings()
            .filter(
                booking =>
                    booking.userId ===
                    currentUser.id
            )
            .reverse();


    if (!bookings.length) {

        container.innerHTML = `

            <div class="dashboard-card">

                <div class="empty-state">

                    <i class="fa-solid fa-ticket"></i>

                    <h3>No bookings yet</h3>

                    <p>
                        Start your first journey with GoBus.
                    </p>

                    <button
                        class="primary-btn"
                        style="margin-top:15px;"
                        onclick="showHome()"
                    >
                        Find a bus
                    </button>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML =
        bookings
            .map(
                booking => `

                    <div
                        class="dashboard-card"
                        style="margin-bottom:12px;"
                    >

                        <div
                            class="booking-list-item"
                            style="
                                border:none;
                                padding:0;
                                margin:0;
                            "
                        >

                            <div>

                                <span class="eyebrow">
                                    ${escapeHTML(booking.id)}
                                </span>

                                <div class="booking-route">

                                    <div>

                                        <strong>
                                            ${escapeHTML(booking.from)}
                                            →
                                            ${escapeHTML(booking.to)}
                                        </strong>

                                        <span>
                                            ${formatDate(booking.date)}
                                            ·
                                            ${formatTime(booking.departure)}
                                        </span>

                                    </div>

                                </div>

                                <p style="
                                    color:#667085;
                                    font-size:10px;
                                    margin-top:7px;
                                ">
                                    ${escapeHTML(booking.busName)}
                                    · Seats
                                    ${booking.seats.join(", ")}
                                </p>

                            </div>


                            <div class="booking-meta">

                                <div>

                                    <span>Total</span>

                                    <strong>
                                        ${formatCurrency(booking.amount)}
                                    </strong>

                                </div>

                                <span class="status ${
                                    booking.status.toLowerCase()
                                }">
                                    ${booking.status}
                                </span>

                                ${
                                    booking.status === "Confirmed"
                                    ? `
                                        <button
                                            class="small-btn"
                                            onclick="cancelBooking('${booking.id}')"
                                        >
                                            Cancel
                                        </button>
                                    `
                                    : ""
                                }

                                ${
                                    booking.status === "Completed"
                                    ? `
                                        <button
                                            class="small-btn"
                                            onclick="openCommentModal('${booking.busId}')"
                                        >
                                            Review
                                        </button>
                                    `
                                    : ""
                                }

                            </div>

                        </div>

                    </div>

                `
            )
            .join("");

}


function cancelBooking(bookingId) {

    if (
        !confirm(
            "Are you sure you want to cancel this booking?"
        )
    ) {
        return;
    }


    const bookings = getBookings();

    const booking =
        bookings.find(
            item => item.id === bookingId
        );

    if (!booking) return;


    booking.status = "Cancelled";


    const buses = getBuses();

    const bus =
        buses.find(
            item =>
                item.id === booking.busId
        );


    if (bus) {

        bus.bookedSeats =
            (bus.bookedSeats || [])
                .filter(
                    seat =>
                        !booking.seats.includes(seat)
                );

    }


    saveBuses(buses);

    saveBookings(bookings);

    updateUserDashboard();

    showToast(
        "Booking cancelled successfully."
    );

}


function handleProfileUpdate(event) {

    event.preventDefault();

    const users = getUsers();

    const user =
        users.find(
            item =>
                item.id === currentUser.id
        );

    if (!user) return;


    user.name =
        document.getElementById(
            "profileName"
        ).value.trim();

    user.phone =
        document.getElementById(
            "profilePhone"
        ).value.trim();

    user.city =
        document.getElementById(
            "profileCity"
        ).value.trim();


    saveUsers(users);

    currentUser = user;

    localStorage.setItem(
        STORAGE.currentUser,
        JSON.stringify(user)
    );

    updateUserDashboard();

    showToast(
        "Profile updated successfully."
    );

}


function handlePasswordChange(event) {

    event.preventDefault();

    const current =
        document.getElementById(
            "currentPassword"
        ).value;

    const newPassword =
        document.getElementById(
            "newPassword"
        ).value;

    const confirm =
        document.getElementById(
            "confirmPassword"
        ).value;


    if (current !== currentUser.password) {

        showToast(
            "Current password is incorrect.",
            "error"
        );

        return;

    }


    if (newPassword !== confirm) {

        showToast(
            "New passwords do not match.",
            "error"
        );

        return;

    }


    const users = getUsers();

    const user =
        users.find(
            item =>
                item.id === currentUser.id
        );

    user.password = newPassword;

    saveUsers(users);

    currentUser = user;

    localStorage.setItem(
        STORAGE.currentUser,
        JSON.stringify(user)
    );


    document
        .getElementById("passwordForm")
        .reset();


    showToast(
        "Password updated successfully."
    );

}


/* =========================================================
   SIDEBAR
========================================================= */

function toggleUserSidebar() {

    document
        .getElementById("userSidebar")
        .classList.toggle("open");

}


function toggleAdminSidebar() {

    document
        .getElementById("adminSidebar")
        .classList.toggle("open");

}


/* =========================================================
   ADMIN APP
========================================================= */

function showAdminApp() {

    hideAllMainPages();

    document
        .getElementById("adminApp")
        .classList.remove("hidden");

    updateAdminDashboard();

    showAdminSection("dashboard");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function showAdminSection(section) {

    document
        .querySelectorAll(
            "#adminApp .admin-section"
        )
        .forEach(element =>
            element.classList.remove("active")
        );


    const target =
        document.getElementById(
            `admin-${section}`
        );

    if (target) {

        target.classList.add("active");

    }


    document
        .querySelectorAll(
            "#adminApp .sidebar-link"
        )
        .forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.adminSection === section
            );

        });


    if (section === "dashboard") {
        updateAdminDashboard();
    }

    if (section === "buses") {
        renderAdminBuses();
    }

    if (section === "bookings") {
        renderAdminBookings();
    }

    if (section === "users") {
        renderAdminUsers();
    }

    if (section === "comments") {
        renderAdminComments();
    }

    if (section === "news") {
        renderAdminNews();
    }

    if (section === "reports") {
        renderReports();
    }

}


function updateAdminDashboard() {

    const buses = getBuses();

    const bookings = getBookings();

    const users =
        getUsers()
            .filter(
                user =>
                    user.role === "user"
            );

    const revenue =
        bookings
            .filter(
                booking =>
                    booking.status !== "Cancelled"
            )
            .reduce(
                (sum, booking) =>
                    sum + Number(booking.amount),
                0
            );


    document.getElementById(
        "adminBusCount"
    ).textContent = buses.length;

    document.getElementById(
        "adminBookingCount"
    ).textContent = bookings.length;

    document.getElementById(
        "adminUserCount"
    ).textContent = users.length;

    document.getElementById(
        "adminRevenue"
    ).textContent =
        formatCurrency(revenue);


    const container =
        document.getElementById(
            "adminRecentBookings"
        );


    const recent =
        bookings
            .slice(-5)
            .reverse();


    if (!recent.length) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-ticket"></i>

                <h3>No bookings</h3>

                <p>
                    Customer transactions will appear here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        recent
            .map(
                booking => `

                    <div class="booking-list-item">

                        <div>

                            <span class="eyebrow">
                                ${escapeHTML(booking.id)}
                            </span>

                            <div class="booking-route">

                                <div>

                                    <strong>
                                        ${escapeHTML(booking.from)}
                                        →
                                        ${escapeHTML(booking.to)}
                                    </strong>

                                    <span>
                                        ${escapeHTML(booking.busName)}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div class="booking-meta">

                            <strong>
                                ${formatCurrency(booking.amount)}
                            </strong>

                            <span class="status ${
                                booking.status.toLowerCase()
                            }">
                                ${booking.status}
                            </span>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =========================================================
   ADMIN BUS CRUD
========================================================= */

function openBusModal(busId = null) {

    editingBusId = busId;

    const form =
        document.getElementById("busForm");

    form.reset();

    document.getElementById(
        "editBusId"
    ).value = "";

    document.getElementById(
        "busModalTitle"
    ).textContent =
        busId
            ? "Edit bus"
            : "Add new bus";


    if (busId) {

        const bus =
            getBuses().find(
                item => item.id === busId
            );

        if (!bus) return;


        document.getElementById(
            "editBusId"
        ).value = bus.id;

        document.getElementById(
            "busName"
        ).value = bus.name;

        document.getElementById(
            "busType"
        ).value = bus.type;

        document.getElementById(
            "busFrom"
        ).value = bus.from;

        document.getElementById(
            "busTo"
        ).value = bus.to;

        document.getElementById(
            "busDeparture"
        ).value = bus.departure;

        document.getElementById(
            "busArrival"
        ).value = bus.arrival;

        document.getElementById(
            "busPrice"
        ).value = bus.price;

        document.getElementById(
            "busSeats"
        ).value = bus.seats;

        document.getElementById(
            "busImage"
        ).value = bus.image;

        document.getElementById(
            "busDescription"
        ).value = bus.description;

    }


    openModal("busModal");

}


function handleBusSubmit(event) {

    event.preventDefault();

    const buses = getBuses();

    const id =
        document.getElementById(
            "editBusId"
        ).value;


    const busData = {

        name:
            document.getElementById(
                "busName"
            ).value.trim(),

        type:
            document.getElementById(
                "busType"
            ).value,

        from:
            document.getElementById(
                "busFrom"
            ).value.trim(),

        to:
            document.getElementById(
                "busTo"
            ).value.trim(),

        departure:
            document.getElementById(
                "busDeparture"
            ).value,

        arrival:
            document.getElementById(
                "busArrival"
            ).value,

        price:
            Number(
                document.getElementById(
                    "busPrice"
                ).value
            ),

        seats:
            Number(
                document.getElementById(
                    "busSeats"
                ).value
            ),

        image:
            document.getElementById(
                "busImage"
            ).value.trim()
            ||
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",

        description:
            document.getElementById(
                "busDescription"
            ).value.trim()

    };


    if (id) {

        const index =
            buses.findIndex(
                bus =>
                    bus.id === id
            );

        if (index !== -1) {

            buses[index] = {

                ...buses[index],

                ...busData

            };

        }

        showToast(
            "Bus updated successfully."
        );

    } else {

        buses.push({

            id: generateId("BUS"),

            ...busData,

            bookedSeats: [],

            rating: 5,

            reviews: 0

        });

        showToast(
            "New bus added successfully."
        );

    }


    saveBuses(buses);

    closeModal("busModal");

    renderAdminBuses();

    updateAdminDashboard();

}


function renderAdminBuses() {

    const tbody =
        document.getElementById(
            "adminBusTable"
        );

    const search =
        (
            document.getElementById(
                "busSearchAdmin"
            )?.value || ""
        )
            .toLowerCase();


    const buses =
        getBuses().filter(
            bus =>
                bus.name.toLowerCase().includes(search)
                ||
                bus.from.toLowerCase().includes(search)
                ||
                bus.to.toLowerCase().includes(search)
        );


    tbody.innerHTML =
        buses
            .map(
                bus => `

                    <tr>

                        <td>

                            <div class="table-bus">

                                <img
                                    src="${escapeHTML(bus.image)}"
                                    alt=""
                                >

                                <div>

                                    <strong>
                                        ${escapeHTML(bus.name)}
                                    </strong>

                                    <span>
                                        ${escapeHTML(bus.id)}
                                    </span>

                                </div>

                            </div>

                        </td>

                        <td>
                            ${escapeHTML(bus.from)}
                            →
                            ${escapeHTML(bus.to)}
                        </td>

                        <td>
                            ${escapeHTML(bus.type)}
                        </td>

                        <td>
                            ${formatTime(bus.departure)}
                        </td>

                        <td>
                            ${
                                bus.seats -
                                (bus.bookedSeats || []).length
                            }
                            /
                            ${bus.seats}
                        </td>

                        <td>
                            ${formatCurrency(bus.price)}
                        </td>

                        <td>

                            <div class="table-actions">

                                <button
                                    class="table-action edit"
                                    onclick="openBusModal('${bus.id}')"
                                    title="Edit"
                                >
                                    <i class="fa-solid fa-pen"></i>
                                </button>

                                <button
                                    class="table-action delete"
                                    onclick="deleteBus('${bus.id}')"
                                    title="Delete"
                                >
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </div>

                        </td>

                    </tr>

                `
            )
            .join("");

}


function deleteBus(busId) {

    if (
        !confirm(
            "Delete this bus from the system?"
        )
    ) {
        return;
    }


    const buses =
        getBuses()
            .filter(
                bus =>
                    bus.id !== busId
            );

    saveBuses(buses);

    renderAdminBuses();

    updateAdminDashboard();

    showToast(
        "Bus deleted successfully."
    );

}


/* =========================================================
   ADMIN BOOKINGS
========================================================= */

function renderAdminBookings() {

    const tbody =
        document.getElementById(
            "adminBookingTable"
        );

    const bookings =
        getBookings().reverse();


    if (!bookings.length) {

        tbody.innerHTML = `

            <tr>

                <td colspan="8">

                    <div class="empty-state">

                        <i class="fa-solid fa-ticket"></i>

                        <h3>No bookings</h3>

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    tbody.innerHTML =
        bookings
            .map(
                booking => {

                    const user =
                        getUsers().find(
                            item =>
                                item.id ===
                                booking.userId
                        );

                    return `

                        <tr>

                            <td>
                                <strong>
                                    ${escapeHTML(booking.id)}
                                </strong>
                            </td>

                            <td>
                                ${
                                    escapeHTML(
                                        user?.name ||
                                        "Unknown"
                                    )
                                }
                            </td>

                            <td>
                                ${escapeHTML(booking.busName)}
                            </td>

                            <td>
                                ${escapeHTML(booking.from)}
                                →
                                ${escapeHTML(booking.to)}
                            </td>

                            <td>
                                ${booking.seats.join(", ")}
                            </td>

                            <td>
                                ${formatCurrency(booking.amount)}
                            </td>

                            <td>

                                <span class="status ${
                                    booking.status.toLowerCase()
                                }">
                                    ${booking.status}
                                </span>

                            </td>

                            <td>

                                ${
                                    booking.status === "Confirmed"
                                    ?
                                    `
                                        <button
                                            class="small-btn"
                                            onclick="adminCancelBooking('${booking.id}')"
                                        >
                                            Cancel
                                        </button>
                                    `
                                    :
                                    "-"
                                }

                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

}


function adminCancelBooking(bookingId) {

    if (
        !confirm(
            "Cancel this booking?"
        )
    ) {
        return;
    }


    const bookings =
        getBookings();

    const booking =
        bookings.find(
            item =>
                item.id === bookingId
        );

    if (!booking) return;


    booking.status = "Cancelled";


    const buses =
        getBuses();

    const bus =
        buses.find(
            item =>
                item.id ===
                booking.busId
        );


    if (bus) {

        bus.bookedSeats =
            (bus.bookedSeats || [])
                .filter(
                    seat =>
                        !booking.seats.includes(
                            seat
                        )
                );

    }


    saveBuses(buses);

    saveBookings(bookings);

    renderAdminBookings();

    updateAdminDashboard();

    showToast(
        "Booking cancelled."
    );

}


/* =========================================================
   ADMIN USERS
========================================================= */

function renderAdminUsers() {

    const tbody =
        document.getElementById(
            "adminUserTable"
        );

    const users =
        getUsers()
            .filter(
                user =>
                    user.role === "user"
            );


    tbody.innerHTML =
        users
            .map(
                user => {

                    const bookings =
                        getBookings()
                            .filter(
                                booking =>
                                    booking.userId ===
                                    user.id
                            )
                            .length;

                    return `

                        <tr>

                            <td>

                                <div class="table-bus">

                                    <div
                                        class="avatar"
                                        style="
                                            width:38px;
                                            height:38px;
                                            font-size:10px;
                                        "
                                    >
                                        ${getInitials(user.name)}
                                    </div>

                                    <div>

                                        <strong>
                                            ${escapeHTML(user.name)}
                                        </strong>

                                        <span>
                                            ${escapeHTML(user.id)}
                                        </span>

                                    </div>

                                </div>

                            </td>

                            <td>
                                ${escapeHTML(user.email)}
                            </td>

                            <td>
                                ${escapeHTML(user.phone || "-")}
                            </td>

                            <td>
                                ${escapeHTML(user.city || "-")}
                            </td>

                            <td>
                                ${bookings}
                            </td>

                            <td>
                                ${formatDate(user.joined)}
                            </td>

                        </tr>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   COMMENTS
========================================================= */

function openCommentModal(busId) {

    if (!currentUser) {

        openLoginModal();

        return;

    }

    document.getElementById(
        "commentBusId"
    ).value = busId;

    document.getElementById(
        "commentRating"
    ).value = 5;

    document.getElementById(
        "commentText"
    ).value = "";

    document
        .querySelectorAll(
            ".rating-input button"
        )
        .forEach(button =>
            button.classList.toggle(
                "active",
                Number(button.dataset.rating) <= 5
            )
        );

    openModal("commentModal");

}


function handleRatingClick(event) {

    const rating =
        Number(
            event.currentTarget.dataset.rating
        );

    document.getElementById(
        "commentRating"
    ).value = rating;

    document
        .querySelectorAll(
            ".rating-input button"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                Number(button.dataset.rating) <= rating
            );

        });

}


function handleCommentSubmit(event) {

    event.preventDefault();

    const comments = getComments();

    comments.push({

        id: generateId("COM"),

        userId: currentUser.id,

        userName: currentUser.name,

        busId:
            document.getElementById(
                "commentBusId"
            ).value,

        rating:
            Number(
                document.getElementById(
                    "commentRating"
                ).value
            ),

        text:
            document.getElementById(
                "commentText"
            ).value.trim(),

        date:
            new Date()
                .toISOString()
                .split("T")[0]

    });


    saveComments(comments);

    closeModal("commentModal");

    showToast(
        "Thank you! Your review has been submitted."
    );

}


function renderAdminComments() {

    const container =
        document.getElementById(
            "adminCommentsList"
        );

    const comments =
        getComments()
            .reverse();


    if (!comments.length) {

        container.innerHTML = `

            <div class="dashboard-card">

                <div class="empty-state">

                    <i class="fa-solid fa-comments"></i>

                    <h3>No reviews yet</h3>

                    <p>
                        Customer comments will appear here.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    const buses =
        getBuses();


    container.innerHTML =
        comments
            .map(
                comment => {

                    const bus =
                        buses.find(
                            item =>
                                item.id ===
                                comment.busId
                        );

                    return `

                        <div class="comment-admin-card">

                            <div>

                                <div class="comment-stars">

                                    ${"★".repeat(
                                        comment.rating
                                    )}

                                    ${"☆".repeat(
                                        5 -
                                        comment.rating
                                    )}

                                </div>

                                <h4>
                                    ${escapeHTML(
                                        comment.userName
                                    )}
                                </h4>

                                <p>
                                    ${escapeHTML(
                                        comment.text
                                    )}
                                </p>

                                <small style="
                                    color:#98a2b3;
                                    font-size:9px;
                                ">
                                    ${
                                        escapeHTML(
                                            bus?.name ||
                                            "Unknown bus"
                                        )
                                    }
                                    ·
                                    ${formatDate(comment.date)}
                                </small>

                            </div>

                            <div class="comment-actions">

                                <button
                                    class="small-btn"
                                    onclick="deleteComment('${comment.id}')"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


function deleteComment(commentId) {

    const comments =
        getComments()
            .filter(
                comment =>
                    comment.id !== commentId
            );

    saveComments(comments);

    renderAdminComments();

    showToast(
        "Comment removed."
    );

}


/* =========================================================
   NEWS
========================================================= */

function openNewsModal() {

    document
        .getElementById("newsForm")
        .reset();

    openModal("newsModal");

}


function handleNewsSubmit(event) {

    event.preventDefault();

    const news = getNews();

    news.push({

        id: generateId("NEWS"),

        title:
            document.getElementById(
                "newsTitle"
            ).value.trim(),

        content:
            document.getElementById(
                "newsContent"
            ).value.trim(),

        date:
            new Date()
                .toISOString()
                .split("T")[0]

    });


    saveNews(news);

    closeModal("newsModal");

    renderAdminNews();

    showToast(
        "Announcement published."
    );

}


function renderAdminNews() {

    const container =
        document.getElementById(
            "newsAdminList"
        );

    const news =
        getNews()
            .reverse();


    if (!news.length) {

        container.innerHTML = `

            <div class="dashboard-card">

                <div class="empty-state">

                    <i class="fa-solid fa-newspaper"></i>

                    <h3>No announcements</h3>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML =
        news
            .map(
                item => `

                    <div class="news-admin-card">

                        <div class="news-date">
                            ${formatDate(item.date)}
                        </div>

                        <h3>
                            ${escapeHTML(item.title)}
                        </h3>

                        <p>
                            ${escapeHTML(item.content)}
                        </p>

                        <button
                            class="small-btn"
                            style="margin-top:15px;"
                            onclick="deleteNews('${item.id}')"
                        >
                            Delete
                        </button>

                    </div>

                `
            )
            .join("");

}


function deleteNews(newsId) {

    const news =
        getNews()
            .filter(
                item =>
                    item.id !== newsId
            );

    saveNews(news);

    renderAdminNews();

    showToast(
        "Announcement deleted."
    );

}


/* =========================================================
   REPORTS
========================================================= */

function renderReports() {

    const bookings =
        getBookings();

    const buses =
        getBuses();

    const validBookings =
        bookings.filter(
            booking =>
                booking.status !== "Cancelled"
        );

    const revenue =
        validBookings.reduce(
            (sum, booking) =>
                sum + Number(booking.amount),
            0
        );

    const average =
        validBookings.length
            ? Math.round(
                revenue /
                validBookings.length
            )
            : 0;


    document.getElementById(
        "reportRevenue"
    ).textContent =
        formatCurrency(revenue);

    document.getElementById(
        "reportBookings"
    ).textContent =
        bookings.length;

    document.getElementById(
        "reportAverage"
    ).textContent =
        formatCurrency(average);

    document.getElementById(
        "reportBuses"
    ).textContent =
        buses.length;


    const routeMap = {};


    validBookings.forEach(
        booking => {

            const route =
                `${booking.from} → ${booking.to}`;

            routeMap[route] =
                (routeMap[route] || 0) + 1;

        }
    );


    const routes =
        Object.entries(routeMap)
            .sort(
                (a,b) =>
                    b[1] - a[1]
            );


    const container =
        document.getElementById(
            "routeReport"
        );


    if (!routes.length) {

        container.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-chart-column"></i>

                <h3>No route data yet</h3>

                <p>
                    Booking statistics will appear here.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        routes
            .map(
                ([route, count]) => `

                    <div class="route-report-item">

                        <strong>
                            ${escapeHTML(route)}
                        </strong>

                        <span>
                            ${count}
                            booking${count === 1 ? "" : "s"}
                        </span>

                    </div>

                `
            )
            .join("");

}


function printReport() {

    const bookings = getBookings();

    const revenue =
        bookings
            .filter(
                booking =>
                    booking.status !== "Cancelled"
            )
            .reduce(
                (sum, booking) =>
                    sum + Number(booking.amount),
                0
            );


    const reportWindow =
        window.open(
            "",
            "_blank"
        );


    reportWindow.document.write(`

        <html>

        <head>

            <title>GoBus Business Report</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    color: #111827;
                }

                h1 {
                    margin-bottom: 5px;
                }

                p {
                    color: #667085;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 25px;
                }

                th,
                td {
                    border: 1px solid #ddd;
                    padding: 10px;
                    text-align: left;
                }

                th {
                    background: #f5f5f5;
                }

            </style>

        </head>

        <body>

            <h1>GoBus Business Report</h1>

            <p>
                Generated:
                ${new Date().toLocaleString("en-IN")}
            </p>

            <h3>
                Total Revenue:
                ${formatCurrency(revenue)}
            </h3>

            <h3>
                Total Bookings:
                ${bookings.length}
            </h3>

            <table>

                <thead>

                    <tr>

                        <th>Booking ID</th>
                        <th>Route</th>
                        <th>Bus</th>
                        <th>Seats</th>
                        <th>Amount</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    ${bookings
                        .map(
                            booking => `

                                <tr>

                                    <td>
                                        ${escapeHTML(
                                            booking.id
                                        )}
                                    </td>

                                    <td>
                                        ${escapeHTML(
                                            booking.from
                                        )}
                                        →
                                        ${escapeHTML(
                                            booking.to
                                        )}
                                    </td>

                                    <td>
                                        ${escapeHTML(
                                            booking.busName
                                        )}
                                    </td>

                                    <td>
                                        ${booking.seats.join(", ")}
                                    </td>

                                    <td>
                                        ${formatCurrency(
                                            booking.amount
                                        )}
                                    </td>

                                    <td>
                                        ${escapeHTML(
                                            booking.status
                                        )}
                                    </td>

                                </tr>

                            `
                        )
                        .join("")}

                </tbody>

            </table>

        </body>

        </html>

    `);


    reportWindow.document.close();

    reportWindow.print();

}


/* =========================================================
   MODALS
========================================================= */

function openModal(id) {

    document
        .getElementById(id)
        .classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.remove("show");

    }

    if (
        !document.querySelector(
            ".modal-overlay.show"
        )
    ) {

        document.body.style.overflow = "";

    }

}


function closeAllModals() {

    document
        .querySelectorAll(
            ".modal-overlay"
        )
        .forEach(
            modal =>
                modal.classList.remove("show")
        );

    document.body.style.overflow = "";

}


document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal-overlay"
            )
        ) {

            closeModal(
                event.target.id
            );

        }

    }
);


/* =========================================================
   PASSWORD
========================================================= */

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";

        button.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

    } else {

        input.type = "password";

        button.innerHTML =
            '<i class="fa-regular fa-eye"></i>';

    }

}


/* =========================================================
   CARD FORMAT
========================================================= */

function formatCardNumber(event) {

    let value =
        event.target.value
            .replace(/\D/g, "")
            .substring(0, 16);

    value =
        value.match(/.{1,4}/g)?.join(" ")
        || "";

    event.target.value = value;

}