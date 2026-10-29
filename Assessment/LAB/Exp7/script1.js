
const services = [
  { id: "haircut", name: "Haircut & Styling", price: 500,
    description: "Professional cuts and styling." },
  { id: "facial", name: "Facial Treatment", price: 800,
    description: "Refresh and nourish your skin." },
  { id: "makeup", name: "Bridal Makeup", price: 3500,
    description: "Special occasion makeup." },
  { id: "manicure", name: "Manicure & Pedicure", price: 700,
    description: "Complete nail care and relaxation." },
  { id: "haircolor", name: "Hair Coloring", price: 1500,
    description: "Beautiful colour and highlights." },
  { id: "spa", name: "Beauty Spa", price: 1200,
    description: "Relaxing beauty and spa treatment." }
];

const stylists = [
  { id: "ananya", name: "Ananya Sharma",
    specialty: "Hair Styling", icon: "✂️" },
  { id: "priya", name: "Priya Kumar",
    specialty: "Skin Care", icon: "🌸" },
  { id: "meera", name: "Meera Reddy",
    specialty: "Makeup Artist", icon: "💄" }
];

const slots = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

const $ = id => document.getElementById(id);

function readStore(key, fallback = []) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : fallback;
  } catch {
    return fallback;
  }
}

let bookings = readStore("glowBookings");
let blockedSlots = readStore("glowBlockedSlots");
let feedback = readStore("glowFeedback");

let calendarDate = new Date();
calendarDate.setDate(1);
let selectedCalendarDay = "";

function saveData() {
  localStorage.setItem("glowBookings", JSON.stringify(bookings));
  localStorage.setItem("glowBlockedSlots", JSON.stringify(blockedSlots));
  localStorage.setItem("glowFeedback", JSON.stringify(feedback));
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function money(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function todayString() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0")
  ].join("-");
}

function serviceById(id) {
  return services.find(s => s.id === id);
}

function stylistById(id) {
  return stylists.find(s => s.id === id);
}

function bookingIsActive(booking) {
  return booking.status !== "Cancelled";
}

function isPast(date, time = "00:00") {
  return new Date(date + "T" + time + ":00").getTime()
    < Date.now();
}

function init() {
  $("date").min = todayString();
  $("blockDate").min = todayString();

  $("service").innerHTML = services.map(s =>
    `<option value="${s.id}">${escapeHTML(s.name)}
    - ${money(s.price)}</option>`
  ).join("");

  $("stylist").innerHTML = stylists.map(s =>
    `<option value="${s.id}">${escapeHTML(s.name)}
    - ${escapeHTML(s.specialty)}</option>`
  ).join("");

  $("blockStylist").innerHTML = stylists.map(s =>
    `<option value="${s.id}">${escapeHTML(s.name)}</option>`
  ).join("");

  $("blockTime").innerHTML = slots.map(t =>
    `<option value="${t}">${t}</option>`
  ).join("");

  $("serviceCards").innerHTML = services.map(s => `
    <article class="service-card">
      <h3>${escapeHTML(s.name)}</h3>
      <p>${escapeHTML(s.description)}</p>
      <h3>${money(s.price)}</h3>
      <button class="btn" data-service="${s.id}">Book Service</button>
    </article>
  `).join("");

  $("stylistCards").innerHTML = stylists.map(s => `
    <article class="stylist-card">
      <div class="stylist-icon">${s.icon}</div>
      <h3>${escapeHTML(s.name)}</h3>
      <p>${escapeHTML(s.specialty)}</p>
      <button class="btn" data-stylist="${s.id}">Choose Stylist</button>
    </article>
  `).join("");

  refreshTimeSlots();
  updatePrice();
  renderCalendar();
  renderManager();
  renderFeedback();
}

function slotIsUnavailable(stylist, date, time, ignoreId = "") {
  const blocked = blockedSlots.some(b =>
    b.stylist === stylist && b.date === date && b.time === time
  );

  const booked = bookings.some(b =>
    b.id !== ignoreId &&
    bookingIsActive(b) &&
    b.stylist === stylist &&
    b.date === date &&
    b.time === time
  );

  return blocked || booked;
}

function refreshTimeSlots() {
  const date = $("date").value;
  const stylist = $("stylist").value;
  const editId = $("editId").value;

  if (!date || !stylist) {
    $("time").innerHTML =
      '<option value="">Choose a date and stylist first</option>';
    return;
  }

  const oldTime = $("time").value;

  const available = slots.filter(t =>
    !isPast(date, t) &&
    !slotIsUnavailable(stylist, date, t, editId)
  );

  $("time").innerHTML = available.length
    ? available.map(t =>
        `<option value="${t}">${t}</option>`
      ).join("")
    : '<option value="">No slots available</option>';

  if (available.includes(oldTime)) {
    $("time").value = oldTime;
  }

  $("slotMessage").textContent = available.length
    ? `${available.length} available slot(s).`
    : "No slots available. Try another date or stylist.";
}

function updatePrice() {
  const service = serviceById($("service").value);
  const price = service ? service.price : 0;
  const payment = $("paymentType").value;

  let dueNow = 0;

  if (payment === "deposit") dueNow = Math.ceil(price * 0.2);
  if (payment === "full") dueNow = price;

  $("servicePrice").textContent = money(price);
  $("payAmount").textContent = money(dueNow);

  $("paymentNote").textContent = payment === "pay-later"
    ? "Pay at the salon. No online payment is taken."
    : "Demo only: this amount is calculated but not charged.";
}

function showMessage(message, success = false) {
  $("formMessage").textContent = message;
  $("formMessage").style.color = success ? "#24713b" : "#a42d2d";
}

$("service").addEventListener("change", updatePrice);
$("paymentType").addEventListener("change", updatePrice);
$("date").addEventListener("change", refreshTimeSlots);
$("stylist").addEventListener("change", refreshTimeSlots);

$("serviceCards").addEventListener("click", event => {
  const button = event.target.closest("[data-service]");
  if (!button) return;

  $("service").value = button.dataset.service;
  updatePrice();
  $("booking").scrollIntoView({ behavior: "smooth" });
});

$("stylistCards").addEventListener("click", event => {
  const button = event.target.closest("[data-stylist]");
  if (!button) return;

  $("stylist").value = button.dataset.stylist;
  refreshTimeSlots();
  $("booking").scrollIntoView({ behavior: "smooth" });
});

$("bookingForm").addEventListener("submit", event => {
  event.preventDefault();

  const editId = $("editId").value;
  const service = serviceById($("service").value);
  const stylist = stylistById($("stylist").value);
  const date = $("date").value;
  const time = $("time").value;
  const email = $("customerEmail").value.trim().toLowerCase();
  const phone = $("customerPhone").value.trim();

  if (!service || !stylist || !date || !time) {
    showMessage("Please complete all booking fields.");
    return;
  }

  if (date < todayString() || isPast(date, time)) {
    showMessage("Please choose a future appointment time.");
    return;
  }

  if (slotIsUnavailable(stylist.id, date, time, editId)) {
    showMessage("This time slot is unavailable. Please choose another.");
    refreshTimeSlots();
    return;
  }

  const paymentType = $("paymentType").value;
  const amountDue = paymentType === "full"
    ? service.price
    : paymentType === "deposit"
      ? Math.ceil(service.price * 0.2)
      : 0;

  const oldBooking = bookings.find(b => b.id === editId);

  const booking = {
    id: editId || (
      window.crypto && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()) + Math.random().toString(16).slice(2)
    ),
    name: $("customerName").value.trim(),
    email,
    phone,
    service: service.id,
    stylist: stylist.id,
    date,
    time,
    paymentType,
    amount: service.price,
    amountDue,
    paymentStatus: paymentType === "pay-later"
      ? "Pay at salon"
      : "Awaiting online payment",
    status: "Confirmed",
    createdAt: oldBooking?.createdAt || new Date().toISOString()
  };

  if (editId) {
    bookings = bookings.map(b => b.id === editId ? booking : b);
  } else {
    bookings.push(booking);
  }

  saveData();
  $("accountEmail").value = email;
  $("bookingForm").reset();
  $("editId").value = "";
  $("date").min = todayString();
  $("submitBtn").textContent = "Confirm Appointment";
  $("resetEdit").classList.add("hidden");

  refreshTimeSlots();
  updatePrice();
  renderManager();
  renderCustomerBookings(email);
  renderCalendar();

  showMessage(
    editId
      ? "Appointment updated successfully."
      : "Appointment reserved successfully. Online payment is not processed.",
    true
  );
});

$("resetEdit").addEventListener("click", () => {
  $("bookingForm").reset();
  $("editId").value = "";
  $("date").min = todayString();
  $("submitBtn").textContent = "Confirm Appointment";
  $("resetEdit").classList.add("hidden");
  refreshTimeSlots();
  updatePrice();
  showMessage("");
});

function editBooking(id) {
  const b = bookings.find(item => item.id === id);
  if (!b || !bookingIsActive(b)) return;

  $("editId").value = b.id;
  $("customerName").value = b.name;
  $("customerEmail").value = b.email;
  $("customerPhone").value = b.phone;
  $("service").value = b.service;
  $("stylist").value = b.stylist;
  $("date").value = b.date;
  $("paymentType").value = b.paymentType;

  $("date").min = todayString();
  refreshTimeSlots();
  $("time").value = b.time;
  updatePrice();

  $("submitBtn").textContent = "Save Changes";
  $("resetEdit").classList.remove("hidden");
  $("booking").scrollIntoView({ behavior: "smooth" });
}

function cancelBooking(id) {
  const b = bookings.find(item => item.id === id);
  if (!b || !bookingIsActive(b)) return;

  if (!confirm("Cancel this appointment?")) return;

  b.status = "Cancelled";
  saveData();
  refreshTimeSlots();
  renderCalendar();
  renderManager();
  renderCustomerBookings($("accountEmail").value.trim().toLowerCase());
}

$("loadAccount").addEventListener("click", () => {
  const email = $("accountEmail").value.trim().toLowerCase();

  if (!email) {
    $("customerBookings").innerHTML = "<p>Please enter your email.</p>";
    return;
  }

  renderCustomerBookings(email);
});

function renderCustomerBookings(email) {
  const list = bookings
    .filter(b => b.email === email)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  if (!list.length) {
    $("customerBookings").innerHTML =
      "<p>No appointments found for this email.</p>";
    return;
  }

  $("customerBookings").innerHTML = list.map(b => {
    const service = serviceById(b.service);
    const stylist = stylistById(b.stylist);

    return `
      <article class="booking-card">
        <h3>${escapeHTML(service?.name || "Service")}</h3>
        <p>Stylist: ${escapeHTML(stylist?.name || "Unknown")}</p>
        <p>Date: ${escapeHTML(b.date)} at ${escapeHTML(b.time)}</p>
        <p>Total: ${money(b.amount)}</p>
        <p>Payment: ${escapeHTML(b.paymentStatus)}</p>
        <p>Status:
          <span class="status ${b.status === "Cancelled" ? "cancelled" : ""}">
            ${escapeHTML(b.status)}
          </span>
        </p>
        ${b.status !== "Cancelled" ? `
          <button class="btn" data-edit="${b.id}">Reschedule / Edit</button>
          <button class="btn btn-light" data-cancel="${b.id}">Cancel</button>
        ` : ""}
      </article>
    `;
  }).join("");
}

$("customerBookings").addEventListener("click", event => {
  const edit = event.target.closest("[data-edit]");
  const cancel = event.target.closest("[data-cancel]");

  if (edit) editBooking(edit.dataset.edit);
  if (cancel) cancelBooking(cancel.dataset.cancel);
});

function renderManager() {
  const active = bookings.filter(bookingIsActive);
  const upcoming = active.filter(b => !isPast(b.date, b.time));

  $("totalBookings").textContent = bookings.length;
  $("upcomingBookings").textContent = upcoming.length;
  $("cancelledBookings").textContent =
    bookings.filter(b => !bookingIsActive(b)).length;

  $("managerBookings").innerHTML = bookings.length
    ? bookings.map(b => {
      const service = serviceById(b.service);
      const stylist = stylistById(b.stylist);

      return `
        <tr>
          <td>${escapeHTML(b.name)}<br>
            ${escapeHTML(b.email)}</td>
          <td>${escapeHTML(service?.name || "-")}</td>
          <td>${escapeHTML(stylist?.name || "-")}</td>
          <td>${escapeHTML(b.date)}<br>${escapeHTML(b.time)}</td>
          <td>${money(b.amount)}<br>
            ${escapeHTML(b.paymentStatus)}</td>
          <td>${escapeHTML(b.status)}</td>
          <td>
            ${bookingIsActive(b) ? `
              <button class="btn" data-edit="${b.id}">Edit</button>
              <button class="btn btn-light" data-cancel="${b.id}">
                Cancel
              </button>
            ` : "-"}
          </td>
        </tr>
      `;
    }).join("")
    : '<tr><td colspan="7">No reservations yet.</td></tr>';
}

$("managerBookings").addEventListener("click", event => {
  const edit = event.target.closest("[data-edit]");
  const cancel = event.target.closest("[data-cancel]");

  if (edit) editBooking(edit.dataset.edit);
  if (cancel) cancelBooking(cancel.dataset.cancel);
});

function renderCalendar() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  $("calendarTitle").textContent =
    calendarDate.toLocaleDateString("en-IN", {
      month: "long", year: "numeric"
    });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let html = weekdays.map(day =>
    `<div class="weekday">${day}</div>`
  ).join("");

  for (let i = 0; i < firstDay; i++) {
    html += "<div></div>";
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = [
      year,
      String(month + 1).padStart(2, "0"),
      String(day).padStart(2, "0")
    ].join("-");

    const count = bookings.filter(b =>
      b.date === date && bookingIsActive(b)
    ).length;

    const isSelected = selectedCalendarDay === date;

    html += `
      <button class="calendar-day ${count ? "has-booking" : ""}
        ${isSelected ? "selected" : ""}"
        data-day="${date}">
        ${day}
        ${count ? `<span class="count">${count} booking(s)</span>` : ""}
      </button>
    `;
  }

  $("calendar").innerHTML = html;
  renderSelectedDay();
}

function renderSelectedDay() {
  if (!selectedCalendarDay) {
    $("selectedDayInfo").textContent =
      "Select a date to view its reservations.";
    return;
  }

  const list = bookings.filter(b =>
    b.date === selectedCalendarDay && bookingIsActive(b)
  );

  const blocked = blockedSlots.filter(b => b.date === selectedCalendarDay);

  $("selectedDayInfo").innerHTML = `
    <strong>${escapeHTML(selectedCalendarDay)}</strong><br>
    Reservations: ${list.length}<br>
    Blocked slots: ${blocked.length}<br>
    ${list.map(b => `
      ${escapeHTML(b.time)} — ${escapeHTML(b.name)}
      (${escapeHTML(stylistById(b.stylist)?.name || "-")})
    `).join("<br>") || "No reservations for this date."}
  `;
}

$("calendar").addEventListener("click", event => {
  const button = event.target.closest("[data-day]");
  if (!button) return;

  selectedCalendarDay = button.dataset.day;
  renderCalendar();
});

$("prevMonth").addEventListener("click", () => {
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  renderCalendar();
});

$("nextMonth").addEventListener("click", () => {
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  renderCalendar();
});

$("blockForm").addEventListener("submit", event => {
  event.preventDefault();

  const stylist = $("blockStylist").value;
  const date = $("blockDate").value;
  const time = $("blockTime").value;

  if (date < todayString() || isPast(date, time)) {
    alert("Choose a future date and time.");
    return;
  }

  if (slotIsUnavailable(stylist, date, time)) {
    alert("This slot is already booked or blocked.");
    return;
  }

  blockedSlots.push({ stylist, date, time });
  selectedCalendarDay = date;
  saveData();
  refreshTimeSlots();
  renderCalendar();

  alert("Time slot blocked successfully.");
});

function renderFeedback() {
  $("feedbackList").innerHTML = feedback.length
    ? feedback.map(f => `
      <article class="booking-card">
        <p>Rating: ${"★".repeat(f.rating)}</p>
        <p>${escapeHTML(f.comment)}</p>
      </article>
    `).join("")
    : "<p>No feedback yet.</p>";
}

$("feedbackForm").addEventListener("submit", event => {
  event.preventDefault();

  feedback.push({
    email: $("feedbackEmail").value.trim().toLowerCase(),
    rating: Number($("feedbackRating").value),
    comment: $("feedbackText").value.trim()
  });

  saveData();
  $("feedbackForm").reset();
  renderFeedback();
  alert("Thank you for your feedback!");
});

init();
