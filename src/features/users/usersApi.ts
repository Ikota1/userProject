import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from './types';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['Users'],

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),

  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => `users`,
      providesTags: (/* result */) => [{ type: 'Users', id: 'LIST' }],
    }),

    getUser: builder.query<User, number>({
      query: (id) => `users/${id}`,
    }),

    createUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: `users`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});
