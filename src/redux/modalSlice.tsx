import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
interface ModalSlice {
  show: boolean;
  selectedId?: null | number;
}

// Define the initial state using that type
const initialState: ModalSlice = {
  show: false,
  selectedId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    open: (state, action: PayloadAction<string>) => {
      state.selectedId = Number(action.payload);
      state.show = true;
    },
    close: (state) => {
      state.selectedId = null;
      state.show = false;
    },
  },
});

export const { open, close } = modalSlice.actions;
export { modalSlice };
export default modalSlice.reducer;
