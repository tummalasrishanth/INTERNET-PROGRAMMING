/* ================================
   RAILCONNECT APPLICATION
================================ */

const trains = [
    {
        number: "12608",
        name: "Chennai Express",
        from: "Chennai",
        to: "Bangalore",
        departure: "06:15 AM",
        arrival: "11:30 AM",
        duration: "5h 15m",
        seats: 84,
        fare: 650
    },

    {
        number: "12621",
        name: "Tamil Nadu Express",
        from: "Chennai",
        to: "Delhi",
        departure: "10:00 AM",
        arrival: "06:30 PM",
        duration: "32h 30m",
        seats: 126,
        fare: 1850
    },

    {
        number: "12759",
        name: "Charminar Express",
        from: "Chennai",
        to: "Hyderabad",
        departure: "04:30 PM",
        arrival: "08:00 AM",
        duration: "15h 30m",
        seats: 53,
        fare: 980
    },

    {
        number: "12640",
        name: "Brindavan Express",
        from: "Chennai",
        to: "Bangalore",
        departure: "07:50 AM",
        arrival: "01:10 PM",
        duration: "5h 20m",
        seats: 41,
        fare: 720
    },

    {
        number: "12969",
        name: "Jaipur Superfast",
        from: "Mumbai",
        to: "Delhi",
        departure: "08:20 PM",
        arrival: "08:10 AM",
        duration: "11h 50m",
        seats: 62,
        fare: 1450
    }
];


/* ================================
   HOME SEARCH
================================ */

function searchTrains(event) {

    event.preventDefault();

    const from =
        document.getElementById("fromStation").value;

    const to =
        document.getElementById("toStation").value;

    const date =
        document.getElementById("journeyDate").value;

    const travelClass =
        document.getElementById("travelClass").value;

    if (from === to) {

        alert("From and To stations cannot be the same.");

        return;
    }

    localStorage.setItem("searchFrom", from);
    localStorage.setItem("searchTo", to);
    localStorage.setItem("searchDate", date);
    localStorage.setItem("travelClass", travelClass);

    window.location.href = "trains.html";
}


/* ================================
   LOAD TRAINS
================================ */

function loadTrains() {

    const trainList =
        document.getElementById("trainList");

    if (!trainList) {
        return;
    }

    let from =
        localStorage.getItem("searchFrom") || "Chennai";

    let to =
        localStorage.getItem("searchTo") || "Bangalore";

    let date =
        localStorage.getItem("searchDate");

    document.getElementById("displayFrom").textContent =
        from;

    document.getElementById("displayTo").textContent =
        to;

    if (date) {

        const formattedDate =
            new Date(date + "T00:00:00")
                .toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );

        document.getElementById("displayDate")
            .textContent = formattedDate;
    }

    const matchingTrains =
        trains.filter(
            train =>
                train.from === from &&
                train.to === to
        );

    if (matchingTrains.length === 0) {

        trainList.innerHTML = `
            <div class="booking-card">
                <h2>No trains found</h2>
                <p>
                    No demo train is available for this route.
                    Try another route.
                </p>
            </div>
        `;

        return;
    }

    trainList.innerHTML =
        matchingTrains.map(train => `

        <div class="train-card">

            <div class="train-name">

                <h3>${train.name}</h3>

                <span>
                    Train No. ${train.number}
                </span>

            </div>

            <div class="train-time">

                <strong>${train.departure}</strong>

                <span>Departure</span>

            </div>

            <div class="train-time">

                <strong>${train.arrival}</strong>

                <span>Arrival</span>

            </div>

            <div class="train-seats">

                <strong>
                    ${train.seats} Seats
                </strong>

                <span>
                    ${train.duration}
                </span>

            </div>

            <button
                class="book-btn"
                onclick="selectTrain('${train.number}')">

                Book Now

            </button>

        </div>

    `).join("");
}


/* ================================
   SELECT TRAIN
================================ */

function selectTrain(trainNumber) {

    const train =
        trains.find(
            t => t.number === trainNumber
        );

    localStorage.setItem(
        "selectedTrain",
        JSON.stringify(train)
    );

    window.location.href =
        "booking.html";
}


/* ================================
   LOAD SELECTED TRAIN
================================ */

function loadSelectedTrain() {

    const container =
        document.getElementById("selectedTrain");

    if (!container) {
        return;
    }

    const saved =
        localStorage.getItem("selectedTrain");

    if (!saved) {
        container.innerHTML =
            "<p>No train selected.</p>";

        return;
    }

    const train =
        JSON.parse(saved);

    container.innerHTML = `

        <div class="selected-train">

            <h3>
                ${train.name}
            </h3>

            <p>
                Train No: ${train.number}
            </p>

            <p>
                ${train.from}
                →
                ${train.to}
            </p>

            <p>
                ${train.departure}
                -
                ${train.arrival}
            </p>

            <strong>
                Fare: ₹${train.fare}
            </strong>

        </div>

    `;

    const fare =
        document.getElementById("ticketFare");

    const total =
        document.getElementById("totalFare");

    if (fare) {
        fare.textContent =
            "₹" + train.fare;
    }

    if (total) {
        total.textContent =
            "₹" + (train.fare + 35);
    }
}


/* ================================
   SEAT SELECTION
================================ */

function setupSeatSelection() {

    const seats =
        document.querySelectorAll(".seat.available");

    seats.forEach(seat => {

        seat.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".seat.selected")
                    .forEach(s =>
                        s.classList.remove("selected")
                    );

                this.classList.add("selected");

                localStorage.setItem(
                    "selectedSeat",
                    this.textContent
                );
            }
        );

    });
}


/* ================================
   REGISTER
================================ */

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value;

    const mobile =
        document.getElementById("registerMobile").value;

    const email =
        document.getElementById("registerEmail").value;

    const password =
        document.getElementById("registerPassword").value;

    const user = {
        name,
        mobile,
        email,
        password
    };

    localStorage.setItem(
        "railUser",
        JSON.stringify(user)
    );

    alert(
        "Registration successful! Please login."
    );

    window.location.href =
        "login.html";
}


/* ================================
   LOGIN
================================ */

function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const password =
        document.getElementById("loginPassword").value;

    if (
        email === "admin@railconnect.com" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "loggedIn",
            "admin"
        );

        window.location.href =
            "admin.html";

        return;
    }

    const saved =
        localStorage.getItem("railUser");

    if (!saved) {

        alert(
            "Account not found. Please register first."
        );

        return;
    }

    const user =
        JSON.parse(saved);

    if (
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "user"
        );

        window.location.href =
            "dashboard.html";

    } else {

        alert(
            "Invalid email or password."
        );
    }
}


/* ================================
   CONFIRM BOOKING
================================ */

function confirmBooking(event) {

    event.preventDefault();

    const savedTrain =
        localStorage.getItem("selectedTrain");

    if (!savedTrain) {

        alert(
            "Please select a train first."
        );

        return;
    }

    const train =
        JSON.parse(savedTrain);

    const passengerName =
        document.getElementById(
            "passengerName"
        ).value;

    const age =
        document.getElementById(
            "passengerAge"
        ).value;

    const gender =
        document.getElementById(
            "passengerGender"
        ).value;

    const travelClass =
        document.getElementById(
            "bookingClass"
        ).value;

    const seat =
        localStorage.getItem(
            "selectedSeat"
        );

    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;

    if (!seat) {

        alert(
            "Please select a seat."
        );

        return;
    }

    const pnr =
        Math.floor(
            1000000000 +
            Math.random() * 9000000000
        ).toString();

    const booking = {

        pnr,
        passengerName,
        age,
        gender,

        trainName: train.name,
        trainNumber: train.number,

        from: train.from,
        to: train.to,

        seat,
        travelClass,

        fare: train.fare + 35,

        payment,

        status: "CONFIRMED",

        bookingDate:
            new Date().toLocaleDateString(
                "en-IN"
            )

    };

    let bookings =
        JSON.parse(
            localStorage.getItem("bookings") || "[]"
        );

    bookings.push(booking);

    localStorage.setItem(
        "bookings",
        JSON.stringify(bookings)
    );

    alert(
        "Payment successful!\n\n" +
        "Ticket Confirmed!\n" +
        "PNR: " + pnr
    );

    localStorage.setItem(
        "lastPNR",
        pnr
    );

    window.location.href =
        "dashboard.html";
}


/* ================================
   PNR STATUS
================================ */

function checkPNR(event) {

    event.preventDefault();

    const pnr =
        document.getElementById(
            "pnrInput"
        ).value.trim();

    const result =
        document.getElementById(
            "pnrResult"
        );

    const bookings =
        JSON.parse(
            localStorage.getItem("bookings") || "[]"
        );

    const booking =
        bookings.find(
            item => item.pnr === pnr
        );

    if (!booking) {

        result.innerHTML = `

            <div class="pnr-result">

                <strong>
                    PNR Not Found
                </strong>

                <p>
                    Please check the PNR number
                    and try again.
                </p>

            </div>

        `;

        return;
    }

    result.innerHTML = `

        <div class="pnr-result">

            <h3>
                PNR: ${booking.pnr}
            </h3>

            <p>
                Passenger:
                <strong>
                    ${booking.passengerName}
                </strong>
            </p>

            <p>
                Train:
                <strong>
                    ${booking.trainName}
                </strong>
            </p>

            <p>
                Route:
                ${booking.from}
                →
                ${booking.to}
            </p>

            <p>
                Seat:
                <strong>
                    ${booking.seat}
                </strong>
            </p>

            <p>
                Class:
                ${booking.travelClass}
            </p>

            <p>
                Status:
                <span class="status confirmed">
                    ${booking.status}
                </span>
            </p>

        </div>

    `;
}


/* ================================
   DASHBOARD
================================ */

function loadDashboard() {

    const history =
        document.getElementById(
            "bookingHistory"
        );

    if (!history) {
        return;
    }

    const bookings =
        JSON.parse(
            localStorage.getItem("bookings") || "[]"
        );

    const total =
        document.getElementById(
            "totalBookings"
        );

    const confirmed =
        document.getElementById(
            "confirmedBookings"
        );

    const spent =
        document.getElementById(
            "totalSpent"
        );

    total.textContent =
        bookings.length;

    confirmed.textContent =
        bookings.filter(
            b => b.status === "CONFIRMED"
        ).length;

    const totalAmount =
        bookings.reduce(
            (sum, b) =>
                sum + Number(b.fare),
            0
        );

    spent.textContent =
        "₹" + totalAmount;

    if (bookings.length === 0) {

        history.innerHTML = `

            <div class="booking-item">

                <div>
                    <strong>
                        No bookings yet
                    </strong>

                    <p>
                        Your railway tickets will
                        appear here.
                    </p>
                </div>

                <a
                    href="trains.html"
                    class="book-btn">

                    Book Ticket

                </a>

            </div>

        `;

        return;
    }

    history.innerHTML =
        bookings
        .slice()
        .reverse()
        .map(
            booking => `

            <div class="booking-item">

                <div>

                    <strong>
                        ${booking.trainName}
                    </strong>

                    <p>
                        ${booking.from}
                        →
                        ${booking.to}
                    </p>

                    <p>
                        PNR:
                        <strong>
                            ${booking.pnr}
                        </strong>
                    </p>

                </div>

                <div>

                    <p>
                        Seat:
                        ${booking.seat}
                    </p>

                    <p>
                        ₹${booking.fare}
                    </p>

                </div>

                <span class="status confirmed">
                    ${booking.status}
                </span>

            </div>

        `
        )
        .join("");
}