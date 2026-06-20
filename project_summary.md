# SortMyScene — Real-time Event Ticket Booking App

SortMyScene is a state-of-the-art event ticket booking web application designed for real-time seat reservation, payment checkout, and user profile management.

---

## 🚀 Key Features

* **Interactive Seating Charts**: Live updates of seat statuses (`available`, `booked`, and `reserved`).
* **Visual Identity & Theme**: Premium glassmorphic dark-mode aesthetics with dynamic animations and gradients.
* **10-Minute Seat Reservation holds**: Prevent double bookings using MongoDB atomic updates and custom reservation timers.
* **Persistent Booking Progress**: Seat selection states and countdowns remain active even if the checkout popup is dismissed. Includes a floating countdown bar with a "Resume Booking" CTA.
* **Re-openable Checkout**: Clicking your own reserved yellow seats inside the seat grid instantly re-opens the checkout dialog.
* **Modern Profile Settings**: Redesigned settings page featuring a custom initials avatar bubble, a vertical navigation layout, and tabbed details/security forms.

---

## 🛠 Tech Stack

* **Frontend**: React, Redux Toolkit (State Management), RTK Query (Data Fetching/Caching), Tailwind CSS (Styling), Framer Motion (Transitions), Lucide React (Icons).
* **Backend**: Node.js, Express (REST API), MongoDB & Mongoose (Database), JWT (Token Authentication).

---

## ⚙️ How to Install and Run the Project

Follow these steps to set up and run both the server and client components on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).

---

### Step 1: Set Up the Server (Backend)

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Locate the `.env.example` file in the `/server` folder.
   - Rename or copy it to `.env`:
     ```bash
     cp .env.example .env
     ```
   - **Note**: The `.env.example` file is already pre-configured with a live MongoDB Atlas cluster URI and JWT secret so you can start running the app immediately without database configuration.
4. Start the server in development mode:
   ```bash
   npm run dev
   ```
   *The server runs by default on `http://localhost:5000`.*

---

### Step 2: Set Up the Client (Frontend)

1. Open a new terminal window and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install the client dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Locate the `.env.example` file in the `/client` folder.
   - Rename or copy it to `.env`:
     ```bash
     cp .env.example .env
     ```
4. Start the client dev server:
   ```bash
   npm run dev
   ```
   *The application will launch automatically in your browser at `http://localhost:5173`.*

---

## 👤 Testing Credentials

To test the booking flow:
1. Register a new account on the **Sign Up** page.
2. Select any event (e.g., *Coldplay Concert* or *Comedy Special Night*).
3. Click on seats to select them, click **Reserve Seats**, and complete or cancel the checkout.
