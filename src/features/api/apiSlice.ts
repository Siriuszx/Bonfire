import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type postsApiResponse = {};

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (build) => ({
    getChats: build.query<postsApiResponse, number>({
      query: () => `/chats`,
    }),
  }),
});

export const { useGetChatsQuery } = apiSlice;
