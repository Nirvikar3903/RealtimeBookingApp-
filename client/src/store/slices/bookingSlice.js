import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  step: 1,
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
    clearSelectedSeats: (state) => {
      state.selectedSeats = [];
    },
    setReservation: (state, action) => {
      state.reservation = action.payload;
      state.step = 2;
    },
    clearReservation: (state) => {
      state.reservation = null;
      state.step = 1;
      state.selectedSeats = [];
    },
  },
});

export const { toggleSeat, clearSelectedSeats, setReservation, clearReservation } = bookingSlice.actions;
export default bookingSlice.reducer;

