import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cellarsApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL
	}),
	reducerPath: 'cellars',
	endpoints(builder) {
		return {
			addCellar: builder.mutation({
				invalidatesTags: ['Cellars'],
				query: (cellar) => {
					return {
						body: {
							cellar_description: cellar.cellar_description,
							cellar_name: cellar.cellar_name,
							user_id: cellar.user_id
						},
						method: 'POST',
						url: '/cellars'
					};
				}
			}),
			getCellars: builder.query({
				providesTags: ['Cellars'],
				query: (user_id) => {
					return {
						method: 'GET',
						url: `/cellars/${user_id}`
					};
				}
			})
		};
	}
});

export const { useAddCellarMutation, useGetCellarsQuery } = cellarsApi;

export { cellarsApi };
