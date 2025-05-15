# 📆 JobConnect — Booking Page

This is the **Booking Page** for the **JobConnect** application, a platform that connects clients with available service technicians. The page allows users to book services, view their existing bookings, and delete them if needed.

---

## 🚀 Features

- **Create a Booking**  
  Users can schedule an appointment by selecting a time and providing a short description.

- **View Bookings**  
  Logged-in users can view their previously created bookings in a list format.

- **Delete Booking**  
  Users can remove a booking directly from the list of their bookings.

---

## 🛠️ Technologies Used

- React (TypeScript with `.tsx`)
- Vite (for fast frontend build tooling)
- Axios (for HTTP requests)
- Tailwind CSS (optional, for styling if applied)

---

## 🧠 How It Works

1. **Booking Form**  
   Collects a `start time` and `description`, and uses the logged-in client's session to attach the correct `client ID`.

2. **Fetching Bookings**  
   On page load, the frontend makes a `GET` request to fetch bookings associated with the current client.

3. **Deleting a Booking**  
   The user can click a delete button next to each booking, triggering a `DELETE` request.
