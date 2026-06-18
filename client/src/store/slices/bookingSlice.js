import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  reservation: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    toggleSeat: (state, action) => {
      const seatNumber = action.payload;
      if (state.selectedSeats.includes(seatNumber)) {
        state.selectedSeats = state.selectedSeats.filter((s) => s !== seatNumber);
      } else {
        state.selectedSeats.push(seatNumber);
      }
    },
    clearSelection: (state) => {
      state.selectedSeats = [];
    },
    setReservation: (state, action) => {
      state.reservation = action.payload;
    },
    clearReservation: (state) => {
      state.reservation = null;
      state.selectedSeats = [];
    },
  },
});

export const { toggleSeat, clearSelection, setReservation, clearReservation } = bookingSlice.actions;
export default bookingSlice.reducer;
