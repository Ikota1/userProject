import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from './types';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: ['Posts'],

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),

  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({
      query: (id) => `posts?userId=${id}`,
      providesTags: (/* result */) => [{ type: 'Posts', id: 'LIST' }],
    }),

    addPost: builder.mutation<Post, Partial<Post>>({
      query(body) {
        return {
          url: `post`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),

    updatePost: builder.mutation<Post, Partial<Post>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `posts/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (/*result, error, { id }*/) => [
        { type: 'Posts', id: 'LIST' },
      ],
    }),

    deletePost: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (/*result, error, id*/) => [
        { type: 'Posts', id: 'LIST' },
      ],
    }),
  }),
});
