import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { supabase } from '../db/supabase';

// Define a type for the slice state

interface Entries {
  amount: number;
  category: string;
  id: string;
  created_at: string;
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
      state.total = action.payload.reduce((acc, curr) => acc + Number(curr.amount), 0);
      state.entries = action.payload;
    },
    reset: (state) => {
      state.total = 0;
      state.entries = [];
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      const deletedArr = state.entries.filter((entry) => entry.id !== action.payload);
      state.entries = deletedArr;
      state.total = deletedArr.reduce((acc, curr) => acc + Number(curr.amount), 0);
    },
    editEntry: (state, action: PayloadAction<Entries>) => {
      const editedArr = state.entries.map((entry) => { 
        if(entry.id === action.payload.id) {
          return action.payload
        }else {
          return entry
        }
      });
      state.entries = editedArr;
    }
  },
});

export const { deleteEntry, setEntries, reset, editEntry } = budgetSlice.actions;
export { budgetSlice };
export type { Entries };
export default budgetSlice.reducer;
