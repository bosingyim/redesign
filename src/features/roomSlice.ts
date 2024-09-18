import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomState {
  selectedRoom: {
    name: string;
    name_en: string;
  } | null;
}

const initialState: RoomState = {
  selectedRoom: null,
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    selectRoom(state, action: PayloadAction<{ name: string; name_en: string }>) {
      state.selectedRoom = action.payload;
    },
  },
});

export const { selectRoom } = roomSlice.actions;
export default roomSlice.reducer;
