import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const breweriesApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL
	}),
	reducerPath: 'breweries',
	endpoints(builder) {
		return {
			addBrewery: builder.mutation({
				invalidatesTags: ['Breweries'],
				query: (brewery) => {
					return {
						body: {
							brewery_name: brewery.brewery_name
						},
						headers: {
							Authorization: brewery.user_auth
						},
						method: 'POST',
						url: '/breweries'
					};
				}
			}),
			getBreweries: builder.query({
				providesTags: ['Breweries'],
				query: (user) => {
					return {
						headers: {
							Authorization: user.user_auth
						},
						method: 'GET',
						url: '/breweries'
					};
				}
			})
		};
	}
});

export const { useAddBreweryMutation, useGetBreweriesQuery } = breweriesApi;

export { breweriesApi };
