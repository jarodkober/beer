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
							cellar_name: cellar.cellar_name
						},
						headers: {
							Authorization: cellar.user_auth
						},
						method: 'POST',
						url: `/user/${cellar.user_id}/cellars`
					};
				}
			}),
			deleteCellar: builder.mutation({
				invalidatesTags: ['Cellars'],
				query: (cellar) => {
					return {
						headers: {
							Authorization: cellar.user_auth
						},
						method: 'DELETE',
						url: `/user/${cellar.user_id}/cellars/${cellar.cellar_id}`
					};
				}
			}),
			getCellars: builder.query({
				providesTags: ['Cellars'],
				query: (user) => {
					return {
						headers: {
							Authorization: user.user_auth
						},
						method: 'GET',
						url: `/user/${user.user_id}/cellars`
					};
				}
			})
		};
	}
});

export const {
	useAddCellarMutation,
	useDeleteCellarMutation,
	useGetCellarsQuery
} = cellarsApi;

export { cellarsApi };
