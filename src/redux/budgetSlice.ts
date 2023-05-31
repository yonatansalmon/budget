import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { supabase } from '../db/supabase';

// Define a type for the slice state

interface Entries {
  amount: number;
  category: string;
}
interface BudgetState {
  entries: Array<Entries>;
  total: number;
  category: string;
}

// Define the initial state using that type
const initialState: BudgetState = {
  entries: [],
  total: 0,
  category: '',
};

const budgetSlice = createSlice({
  name: 'budget',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<Entries[]>) => {
      console.log(action.payload)
      state.total = action.payload.reduce((acc, curr) => acc + Number(curr.amount), 0);
      state.entries = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // updateTotal: (state, action: PayloadAction<number>) => {
    //   state.total += Number(action.payload);
    // },
  },
});

export const { setEntries } = budgetSlice.actions;
export { budgetSlice };
export default budgetSlice.reducer;
