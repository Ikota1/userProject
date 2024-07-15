import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserFilterState {
  value: string;
}

const initialState: UserFilterState = {
  value: '',
};

export const userFilterSlice = createSlice({
  name: 'userFilter',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { update } = userFilterSlice.actions;
