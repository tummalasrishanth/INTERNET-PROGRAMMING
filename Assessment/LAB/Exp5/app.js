/* ==========================================
   SKYRESERVE FLIGHT RESERVATION SYSTEM
========================================== */


/* ==========================================
   FLIGHT DATABASE - DEMO DATA
========================================== */

const flights = [

    {
        number: "SR101",
        airline: "SkyReserve Airlines",
        from: "Chennai",
        to: "Mumbai",
        departure: "06:30 AM",
        arrival: "08:45 AM",
        duration: "2h 15m",
        seats: 84,
        fare: 4299
    },

    {
        number: "SR205",
        airline: "SkyReserve Airlines",
        from: "Bangalore",
        to: "Delhi",
        departure: "08:10 AM",
        arrival: "11:05 AM",
        duration: "2h 55m",
        seats: 112,
        fare: 5199
    },

    {
        number: "SR310",
        airline: "SkyReserve Airlines",
        from: "Delhi",
        to: "Hyderabad",
        departure: "10:20 AM",
        arrival: "12:25 PM",
        duration: "2h 05m",
        seats: 63,
        fare: 3899
    },

    {
        number: "SR415",
        airline: "SkyReserve Airlines",
        from: "Chennai",
        to: "Bangalore",
        departure: "02:15 PM",
        arrival: "03:20 PM",
        duration: "1h 05m",
        seats: 57,
        fare: 2899
    },

    {
        number: "SR520",
        airline: "SkyReserve Airlines",
        from: "Mumbai",
        to: "Delhi",
        departure: "05:40 PM",
        arrival: "07:45 PM",
        duration: "2h 05m",
        seats: 74,
        fare: 4599
    },

    {
        number: "SR625",
        airline: "SkyReserve Airlines",
        from: "Hyderabad",
        to: "Chennai",
        departure: "09:15 PM",
        arrival: "10:35 PM",
        duration: "1h 20m",
        seats: 45,
        fare: 3199
    }

];


/* ==========================================
   SEARCH FLIGHTS
========================================== */

function searchFlights(event) {

    event.preventDefault();

    const from =
        document.getElementById("fromCity").value;

    const to =
        document.getElementById("toCity").value;

    const date =
        document.getElementById("flightDate").value;

    const flightClass =
        document.getElementById("flightClass").value;

    const passengers =
        document.getElementById("passengers").value;


    if (from === to) {

        alert(
            "Departure and destination cannot be the same."
        );

        return;
    }


    localStorage.setItem(
        "flightFrom",
        from
    );

    localStorage.setItem(
        "flightTo",
        to
    );

    localStorage.setItem(
        "flightDate",
        date
    );

    localStorage.setItem(
        "flightClass",
        flightClass
    );

    localStorage.setItem(
        "passengers",
        passengers
    );


    window.location.href =
        "search-flight.html";
}


/* ==========================================
   LOAD FLIGHTS
========================================== */

function loadFlights() {

    const flightList =
        document.getElementById(
            "flightList"
        );

    if (!flightList) {
        return;
    }


    const from =
        localStorage.getItem(
            "flightFrom"
        ) || "Chennai";


    const to =
        localStorage.getItem(
            "flightTo"
        ) || "Mumbai";


    const date =
        localStorage.getItem(
            "flightDate"
        );


    const flightClass =
        localStorage.getItem(
            "flightClass"
        ) || "Economy";


    document.getElementById(
        "resultFrom"
    ).textContent = from;


    document.getElementById(
        "resultTo"
    ).textContent = to;


    document.getElementById(
        "resultClass"
    ).textContent = flightClass;


    if (date) {

        document.getElementById(
            "resultDate"
        ).textContent =

            new Date(
                date + "T00:00:00"
            ).toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );
    }


    const availableFlights =
        flights.filter(
            flight =>
                flight.from === from &&
                flight.to === to
        );


    if (
        availableFlights.length === 0
    ) {

        flightList.innerHTML = `

            <div class="booking-card">

                <h2>
                    No Flights Found
                </h2>

                <p>
                    No demo flight is available
                    for this route.
                    Please search another route.
                </p>

            </div>

        `;

        return;
    }


    flightList.innerHTML =

        availableFlights.map(
            flight => `

            <div class="flight-card">

                <div class="airline-info">

                    <h3>
                        ${flight.airline}
                    </h3>

                    <span>
                        Flight ${flight.number}
                    </span>

                </div>


                <div class="flight-time">

                    <strong>
                        ${flight.departure}
                    </strong>

                    <span>
                        ${flight.from}
                    </span>

                </div>


                <div class="flight-duration">

                    <span>
                        ${flight.duration}
                    </span>

                    <div class="line"></div>

                    <span>
                        Direct
                    </span>

                </div>


                <div class="flight-time">

                    <strong>
                        ${flight.arrival}
                    </strong>

                    <span>
                        ${flight.to}
                    </span>

                </div>


                <div class="flight-price">

                    <strong>
                        ₹${flight.fare}
                    </strong>

                    <span>
                        ${flight.seats}
                        seats available
                    </span>

                    <button
                        class="book-btn"
                        onclick="selectFlight('${flight.number}')">

                        Select

                    </button>

                </div>

            </div>

        `
        ).join("");
}


/* ==========================================
   SELECT FLIGHT
========================================== */

function selectFlight(
    flightNumber
) {

    const flight =
        flights.find(
            item =>
                item.number === flightNumber
        );


    if (!flight) {
        return;
    }


    localStorage.setItem(
        "selectedFlight",
        JSON.stringify(flight)
    );


    window.location.href =
        "book-ticket.html";
}


/* ==========================================
   LOAD SELECTED FLIGHT
========================================== */

function loadSelectedFlight() {

    const container =
        document.getElementById(
            "selectedFlight"
        );


    if (!container) {
        return;
    }


    const saved =
        localStorage.getItem(
            "selectedFlight"
        );


    if (!saved) {

        container.innerHTML = `
            <p>
                No flight selected.
            </p>
        `;

        return;
    }


    const flight =
        JSON.parse(saved);


    container.innerHTML = `

        <h3>
            ${flight.airline}
        </h3>

        <p>
            Flight Number:
            <strong>
                ${flight.number}
            </strong>
        </p>

        <p>
            ${flight.from}
            →
            ${flight.to}
        </p>

        <p>
            ${flight.departure}
            -
            ${flight.arrival}
        </p>

        <p>
            Duration:
            ${flight.duration}
        </p>

    `;


    const baseFare =
        document.getElementById(
            "baseFare"
        );


    const total =
        document.getElementById(
            "bookingTotal"
        );


    if (baseFare) {

        baseFare.textContent =
            "₹" + flight.fare;
    }


    if (total) {

        total.textContent =
            "₹" +
            (flight.fare + 750);
    }
}


/* ==========================================
   SEAT SELECTION
========================================== */

function setupFlightSeats() {

    const seats =
        document.querySelectorAll(
            ".flight-seat.available"
        );


    seats.forEach(
        seat => {

            seat.addEventListener(
                "click",
                function () {

                    document
                        .querySelectorAll(
                            ".flight-seat.selected"
                        )
                        .forEach(
                            selectedSeat =>
                                selectedSeat
                                    .classList
                                    .remove(
                                        "selected"
                                    )
                        );


                    this.classList.add(
                        "selected"
                    );


                    localStorage.setItem(
                        "selectedSeat",
                        this.textContent
                    );

                }
            );

        }
    );
}


/* ==========================================
   PASSENGER DETAILS
========================================== */

function proceedToPayment(event) {

    event.preventDefault();


    const flight =
        localStorage.getItem(
            "selectedFlight"
        );


    if (!flight) {

        alert(
            "Please select a flight first."
        );

        return;
    }


    const selectedSeat =
        localStorage.getItem(
            "selectedSeat"
        );


    if (!selectedSeat) {

        alert(
            "Please select a seat."
        );

        return;
    }


    const passenger = {

        name:
            document.getElementById(
                "passengerName"
            ).value,

        age:
            document.getElementById(
                "passengerAge"
            ).value,

        gender:
            document.getElementById(
                "passengerGender"
            ).value,

        passport:
            document.getElementById(
                "passport"
            ).value,

        seat:
            selectedSeat

    };


    localStorage.setItem(
        "passenger",
        JSON.stringify(passenger)
    );


    window.location.href =
        "payment.html";
}


/* ==========================================
   PAYMENT SUMMARY
========================================== */

function loadPaymentSummary() {

    const summary =
        document.getElementById(
            "paymentSummary"
        );


    if (!summary) {
        return;
    }


    const savedFlight =
        localStorage.getItem(
            "selectedFlight"
        );


    if (!savedFlight) {
        return;
    }


    const flight =
        JSON.parse(savedFlight);


    const passenger =
        JSON.parse(
            localStorage.getItem(
                "passenger"
            ) || "{}"
        );


    const total =
        flight.fare + 750;


    summary.innerHTML = `

        <p>
            <strong>
                ${flight.airline}
            </strong>
        </p>

        <p>
            Flight:
            ${flight.number}
        </p>

        <p>
            Route:
            ${flight.from}
            →
            ${flight.to}
        </p>

        <p>
            Passenger:
            ${passenger.name || "-"}
        </p>

        <p>
            Seat:
            ${passenger.seat || "-"}
        </p>

    `;


    const paymentTotal =
        document.getElementById(
            "paymentTotal"
        );


    if (paymentTotal) {

        paymentTotal.textContent =
            "₹" + total;
    }
}


/* ==========================================
   COMPLETE PAYMENT
========================================== */

function completePayment(event) {

    event.preventDefault();


    const savedFlight =
        localStorage.getItem(
            "selectedFlight"
        );


    if (!savedFlight) {

        alert(
            "Flight information is missing."
        );

        return;
    }


    const flight =
        JSON.parse(savedFlight);


    const passenger =
        JSON.parse(
            localStorage.getItem(
                "passenger"
            ) || "{}"
        );


    const paymentMethod =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        ).value;


    const pnr =
        Math.floor(
            1000000000 +
            Math.random() *
            9000000000
        ).toString();


    const booking = {

        pnr:

            pnr,

        flightNumber:
            flight.number,

        airline:
            flight.airline,

        from:
            flight.from,

        to:
            flight.to,

        departure:
            flight.departure,

        arrival:
            flight.arrival,

        duration:
            flight.duration,

        passenger:
            passenger.name,

        age:
            passenger.age,

        gender:
            passenger.gender,

        passport:
            passenger.passport,

        seat:
            passenger.seat,

        fare:
            flight.fare + 750,

        payment:
            paymentMethod,

        status:
            "CONFIRMED",

        bookingDate:
            new Date().toLocaleDateString(
                "en-IN"
            )

    };


    let bookings =
        JSON.parse(
            localStorage.getItem(
                "flightBookings"
            ) || "[]"
        );


    bookings.push(booking);


    localStorage.setItem(
        "flightBookings",
        JSON.stringify(bookings)
    );


    localStorage.setItem(
        "lastFlightPNR",
        pnr
    );


    alert(
        "Payment successful!\n\n" +
        "Your flight ticket is confirmed.\n\n" +
        "PNR: " + pnr
    );


    window.location.href =
        "my-ticket.html";
}


/* ==========================================
   MY TICKET
========================================== */

function loadMyTicket() {

    const container =
        document.getElementById(
            "ticketContainer"
        );


    if (!container) {
        return;
    }


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "flightBookings"
            ) || "[]"
        );


    if (bookings.length === 0) {

        container.innerHTML = `

            <div class="booking-card">

                <h2>
                    No Ticket Found
                </h2>

                <p>
                    You have not booked any flights yet.
                </p>

                <br>

                <a
                    href="search-flight.html"
                    class="secondary-btn">

                    Search Flights

                </a>

            </div>

        `;

        return;
    }


    const booking =
        bookings[bookings.length - 1];


    renderTicket(
        container,
        booking
    );
}


/* ==========================================
   RENDER TICKET
========================================== */

function renderTicket(
    container,
    booking
) {

    container.innerHTML = `

        <div class="ticket">

            <div class="ticket-header">

                <div>

                    <h2>
                        ✈️ SkyReserve
                    </h2>

                    <span>
                        E-TICKET
                    </span>

                </div>


                <div class="pnr-box">

                    <span>
                        PNR
                    </span>

                    <strong>
                        ${booking.pnr}
                    </strong>

                </div>

            </div>


            <div class="ticket-body">


                <div class="ticket-route">

                    <div>

                        <h2>
                            ${booking.from}
                        </h2>

                        <span>
                            ${booking.departure}
                        </span>

                    </div>


                    <div>

                        ✈️

                        <br>

                        <span>
                            ${booking.duration}
                        </span>

                    </div>


                    <div>

                        <h2>
                            ${booking.to}
                        </h2>

                        <span>
                            ${booking.arrival}
                        </span>

                    </div>

                </div>


                <div class="ticket-info">

                    <div>

                        <small>
                            PASSENGER
                        </small>

                        <strong>
                            ${booking.passenger}
                        </strong>

                    </div>


                    <div>

                        <small>
                            FLIGHT
                        </small>

                        <strong>
                            ${booking.flightNumber}
                        </strong>

                    </div>


                    <div>

                        <small>
                            SEAT
                        </small>

                        <strong>
                            ${booking.seat}
                        </strong>

                    </div>


                    <div>

                        <small>
                            STATUS
                        </small>

                        <strong>
                            ${booking.status}
                        </strong>

                    </div>


                    <div>

                        <small>
                            BOOKING DATE
                        </small>

                        <strong>
                            ${booking.bookingDate}
                        </strong>

                    </div>


                    <div>

                        <small>
                            PAYMENT
                        </small>

                        <strong>
                            ${booking.payment}
                        </strong>

                    </div>


                    <div>

                        <small>
                            FARE
                        </small>

                        <strong>
                            ₹${booking.fare}
                        </strong>

                    </div>

                </div>


                <div class="ticket-actions">

                    <a
                        href="print-ticket.html"
                        class="primary-btn">

                        🖨️ Print Ticket

                    </a>

                    <a
                        href="cancel-ticket.html"
                        class="secondary-btn">

                        Cancel Ticket

                    </a>

                </div>

            </div>

        </div>

    `;
}


/* ==========================================
   PRINT TICKET
========================================== */

function loadPrintTicket() {

    const container =
        document.getElementById(
            "printTicket"
        );


    if (!container) {
        return;
    }


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "flightBookings"
            ) || "[]"
        );


    if (bookings.length === 0) {

        container.innerHTML =
            "<p>No ticket available.</p>";

        return;
    }


    renderTicket(
        container,
        bookings[bookings.length - 1]
    );
}


/* ==========================================
   BOOKING STATUS
========================================== */

function checkBookingStatus(event) {

    event.preventDefault();


    const pnr =
        document.getElementById(
            "statusPNR"
        ).value.trim();


    const result =
        document.getElementById(
            "statusResult"
        );


    const bookings =
        JSON.parse(
            localStorage.getItem(
                "flightBookings"
            ) || "[]"
        );


    const booking =
        bookings.find(
            item =>
                item.pnr === pnr
        );


    if (!booking) {

        result.innerHTML = `

            <div class="status-result">

                <strong>
                    Booking Not Found
                </strong>

                <p>
                    Please verify your PNR number.
                </p>

            </div>

        `;

        return;
    }


    result.innerHTML = `

        <div class="status-result">

            <h3>
                Booking Confirmed ✓
            </h3>

            <p>
                PNR:
                <strong>
                    ${booking.pnr}
                </strong>
            </p>

            <p>
                Passenger:
                ${booking.passenger}
            </p>

            <p>
                Flight:
                ${booking.flightNumber}
            </p>

            <p>
                Route:
                ${booking.from}
                →
                ${booking.to}
            </p>

            <p>
                Seat:
                ${booking.seat}
            </p>

            <p>
                Status:
                <strong>
                    ${booking.status}
                </strong>
            </p>

        </div>

    `;
}


/* ==========================================
   CANCEL TICKET
========================================== */

function cancelTicket(event) {

    event.preventDefault();


    const pnr =
        document.getElementById(
            "cancelPNR"
        ).value.trim();


    const result =
        document.getElementById(
            "cancelResult"
        );


    let bookings =
        JSON.parse(
            localStorage.getItem(
                "flightBookings"
            ) || "[]"
        );


    const index =
        bookings.findIndex(
            booking =>
                booking.pnr === pnr
        );


    if (index === -1) {

        result.innerHTML = `

            <div class="status-result">

                <strong>
                    PNR Not Found
                </strong>

                <p>
                    Please enter a valid booking reference.
                </p>

            </div>

        `;

        return;
    }


    const booking =
        bookings[index];


    const refund =
        Math.round(
            booking.fare * 0.80
        );


    const confirmed =
        confirm(
            "Are you sure you want to cancel this ticket?\n\n" +
            "Estimated refund: ₹" +
            refund
        );


    if (!confirmed) {
        return;
    }


    booking.status =
        "CANCELLED";


    booking.refund =
        refund;


    bookings[index] =
        booking;


    localStorage.setItem(
        "flightBookings",
        JSON.stringify(bookings)
    );


    result.innerHTML = `

        <div class="status-result">

            <h3>
                Ticket Cancelled
            </h3>

            <p>
                PNR:
                ${booking.pnr}
            </p>

            <p>
                Refund Amount:
                <strong>
                    ₹${refund}
                </strong>
            </p>

        </div>

    `;
}


/* ==========================================
   ADMIN LOGIN
========================================== */

function adminLogin(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "adminEmail"
        ).value;


    const password =
        document.getElementById(
            "adminPassword"
        ).value;


    if (
        email === "admin@skyreserve.com" &&
        password === "admin123"
    ) {

        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );


        window.location.href =
            "admin-report.html";

    } else {

        alert(
            "Invalid administrator credentials."
        );
    }
}


/* ==========================================
   FORGOT PASSWORD
========================================== */

function forgotPassword(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "resetEmail"
        ).value;


    alert(
        "Password reset instructions have been sent to:\n" +
        email
    );
}


/* ==========================================
   FEEDBACK
========================================== */

function submitFeedback(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "feedbackName"
        ).value;


    const rating =
        document.getElementById(
            "feedbackRating"
        ).value;


    const message =
        document.getElementById(
            "feedbackMessage"
        ).value;


    const feedback = {

        name:
            name,

        rating:
            rating,

        message:
            message,

        date:
            new Date().toLocaleDateString(
                "en-IN"
            )

    };


    let feedbacks =
        JSON.parse(
            localStorage.getItem(
                "feedbacks"
            ) || "[]"
        );


    feedbacks.push(
        feedback
    );


    localStorage.setItem(
        "feedbacks",
        JSON.stringify(feedbacks)
    );


    alert(
        "Thank you for your valuable feedback!"
    );


    event.target.reset();
}