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
							description: cellar.description,
							name: cellar.name,
							userId: cellar.userId
						},
						method: 'POST',
						url: '/cellars'
					};
				}
			}),
			getCellars: builder.query({
				providesTags: ['Cellars'],
				query: (userId) => {
					return {
						method: 'GET',
						url: `/cellars/${userId}`
					};
				}
			})
		};
	}
});

export const { useAddCellarMutation, useGetCellarsQuery } = cellarsApi;

export { cellarsApi };
