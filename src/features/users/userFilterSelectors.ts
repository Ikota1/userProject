import { RootState } from '@root/store';

export const selectUserFilterValue = (state: RootState) =>
  state.userFilter.value;
