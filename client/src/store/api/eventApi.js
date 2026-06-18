import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      // Access token from localStorage or Redux state
      const token = localStorage.getItem("token") || getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Events", "Event"],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Event endpoints
    getEvents: builder.query({
      query: () => "/events",
      providesTags: ["Events"],
    }),
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
      providesTags: (result, error, id) => [{ type: "Event", id }],
    }),

    // Reservation & Booking endpoints
    reserveSeats: builder.mutation({
      query: ({ eventId, seatNumbers }) => ({
        url: "/reserve",
        method: "POST",
        body: { eventId, seatNumbers },
      }),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Event", id: eventId },
        "Events",
      ],
    }),
    confirmBooking: builder.mutation({
      query: ({ reservationId }) => ({
        url: "/bookings",
        method: "POST",
        body: { reservationId },
      }),
      // We can pass eventId to invalidate or invalidate generally
      invalidatesTags: (result, error, { eventId }) => [
        { type: "Event", id: eventId },
        "Events",
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useReserveSeatsMutation,
  useConfirmBookingMutation,
} = eventApi;
