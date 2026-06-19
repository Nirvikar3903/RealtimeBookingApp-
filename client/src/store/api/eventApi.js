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
  tagTypes: ["Events", "Seats"],
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
    confirmBooking: builder.mutation({
      query: ({ reservationId }) => ({
        url: "/api/bookings",
        method: "POST",
        body: { reservationId },
      }),
      invalidatesTags: ["Seats", "Events"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useReserveSeatsMutation,
  useConfirmBookingMutation,
} = eventApi;

