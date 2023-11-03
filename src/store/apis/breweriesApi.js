import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const breweriesApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL
	}),
	reducerPath: 'breweries',
	endpoints(builder) {
		return {
			getBreweries: builder.query({
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

export const { useGetBreweriesQuery } = breweriesApi;

export { breweriesApi };
