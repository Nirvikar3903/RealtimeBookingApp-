export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "RealtimeBookingApp API",
    version: "1.0.0",
    description: "API documentation for the RealtimeBookingApp",
  },
  servers: [
    {
      url: "https://realtimebookingapp.onrender.com",
      description: "Production server",
    },
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    "/": {
      get: {
        summary: "Health Check",
        security: [],
        responses: {
          "200": {
            description: "API is running",
          },
        },
      },
    },
    "/api/auth/register": {
      post: {
        summary: "Register a new user",
        tags: ["Auth"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "User registered successfully" },
          "400": { description: "Missing required fields" },
          "409": { description: "Email already exists" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        summary: "Login a user",
        tags: ["Auth"],
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Login successful" },
          "400": { description: "Missing credentials" },
          "401": { description: "Invalid credentials" },
          "404": { description: "User not found" },
        },
      },
    },
    "/api/auth/profile": {
      put: {
        summary: "Update user profile",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                  birthdate: { type: "string", format: "date" },
                  phone: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Profile updated successfully" },
          "401": { description: "Unauthorized" },
          "404": { description: "User not found" },
          "409": { description: "Email is already taken" },
        },
      },
    },
    "/api/events": {
      get: {
        summary: "Get all events",
        tags: ["Events"],
        security: [],
        responses: {
          "200": { description: "List of events" },
        },
      },
    },
    "/api/events/{id}": {
      get: {
        summary: "Get event by ID",
        tags: ["Events"],
        security: [],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Event details" },
          "404": { description: "Event not found" },
        },
      },
    },
    "/api/reserve": {
      post: {
        summary: "Reserve seats for an event",
        tags: ["Reservations"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["eventId", "seatNumbers"],
                properties: {
                  eventId: { type: "string" },
                  seatNumbers: {
                    type: "array",
                    items: { type: "string" },
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Reservation created successfully" },
          "400": { description: "Missing required fields" },
          "401": { description: "Unauthorized" },
          "409": { description: "One or more seats are no longer available" },
        },
      },
    },
    "/api/reserve/cancel": {
      post: {
        summary: "Cancel a reservation",
        tags: ["Reservations"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["eventId"],
                properties: {
                  eventId: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Reservation cancelled successfully" },
          "400": { description: "Event ID is required" },
          "401": { description: "Unauthorized" },
          "404": { description: "No active reservation found to cancel" },
        },
      },
    },
    "/api/bookings": {
      post: {
        summary: "Confirm a booking",
        tags: ["Bookings"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["reservationId"],
                properties: {
                  reservationId: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Booking confirmed successfully" },
          "400": { description: "Reservation ID is required or expired" },
          "404": { description: "Reservation not found" },
        },
      },
    },
    "/api/bookings/my-bookings": {
      get: {
        summary: "Get my bookings",
        tags: ["Bookings"],
        responses: {
          "200": { description: "List of user bookings" },
          "401": { description: "Unauthorized" },
        },
      },
    },
    "/api/bookings/ticket/{reference}": {
      get: {
        summary: "Get a ticket by its ID code",
        tags: ["Bookings"],
        security: [],
        parameters: [
          {
            in: "path",
            name: "reference",
            required: true,
            schema: { type: "string" },
            description: "The unique booking reference string",
          },
        ],
        responses: {
          "200": { description: "Ticket details" },
          "400": { description: "Booking reference is required" },
          "404": { description: "Ticket not found" },
        },
      },
    },
  },
};
