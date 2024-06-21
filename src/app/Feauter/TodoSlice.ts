import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Inputs } from "../page"; // Assuming Inputs is defined somewereh
import { Data } from "../../../types";

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: "todoApi", // Name of the slice
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Base URL of your API
  tagTypes: ["todo"],
  // Define endpoints
  endpoints: (builder) => ({
    // Example mutation endpoint for creating a todo
    createTodo: builder.mutation<any, Inputs>({
      query: (inputData) => ({
        url: `/Addtodo`,
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["todo"],
    }),

    // Example query endpoint for fetching todos
    getTodos: builder.query<Data[], void>({
      query: () => ({
        url: `/Addtodo`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    DeletTodos: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Addtodo?ID=${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["todo"],
    }),
    CompleateTodos: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Addtodo?ID=${id}`,
        method: "PUT",
      }),

      invalidatesTags: ["todo"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateTodoMutation,
  useGetTodosQuery,
  useDeletTodosMutation,
  useCompleateTodosMutation,
} = todoApi;
