import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../../utils/axiosInstance.js";

const axiosBaseQuery = () => async ({ url, method, body }) => {
  try {
    const result = await axiosInstance({
      url,
      method,
      data: body,
    });
    return { data: result.data };
  } catch (err) {
    return { error: err.response?.data || { message: err.message } };
  }
};

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Events", "Seats", "Bookings"],
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: "/api/events",
        method: "GET",
      }),
      providesTags: ["Events"],
    }),
    getEventById: builder.query({
      query: (id) => ({
        url: `/api/events/${id}`,
        method: "GET",
      }),
      providesTags: ["Seats"],
    }),
    reserveSeats: builder.mutation({
      query: ({ eventId, seatNumbers }) => ({
        url: "/api/reserve",
        method: "POST",
        body: { eventId, seatNumbers },
      }),
      invalidatesTags: ["Seats"],
    }),
    cancelReservation: builder.mutation({
      query: ({ eventId }) => ({
        url: "/api/reserve/cancel",
        method: "POST",
        body: { eventId },
      }),
      invalidatesTags: ["Seats"],
    }),
    confirmBooking: builder.mutation({
      query: ({ reservationId }) => ({
        url: "/api/bookings",
        method: "POST",
        body: { reservationId },
      }),
      invalidatesTags: ["Seats", "Events", "Bookings"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/api/auth/profile",
        method: "PUT",
        body: profileData,
      }),
    }),
    getMyBookings: builder.query({
      query: () => ({
        url: "/api/bookings/my-bookings",
        method: "GET",
      }),
      providesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useReserveSeatsMutation,
  useConfirmBookingMutation,
  useCancelReservationMutation,
  useUpdateProfileMutation,
  useGetMyBookingsQuery,
} = eventApi;

