import { configureStore } from '@reduxjs/toolkit';

import { userFilterSlice } from '@features/users/userFilterSlice';
import { usersApi } from '@features/users/usersApi';
import { postsApi } from '@features/posts/postsApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,

    [userFilterSlice.name]: userFilterSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
