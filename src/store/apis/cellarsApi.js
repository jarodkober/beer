import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cellarsApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.1.9:3005'
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
						params: {
							userId
						},
						url: '/cellars'
					};
				}
			})
		};
	}
});

export const { useAddCellarMutation, useGetCellarsQuery } = cellarsApi;

export { cellarsApi };
