import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
interface BudgetState {
  balance: number;
  category: string;

}

// Define the initial state using that type
const initialState: BudgetState = {
  balance: 0,
  category: ''

};

const budgetSlice = createSlice({
  name: 'budget',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    calculateIncome: (state) => {
    },
    calculateExpenses: (state) => {
    },
    calculateBalance: (state) => {
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    addEntry: (state, action: PayloadAction<BudgetState>) => {

    },
  },
});

export const { calculateIncome, calculateExpenses, calculateBalance, addEntry } = budgetSlice.actions;
export { budgetSlice };
export default budgetSlice.reducer;
