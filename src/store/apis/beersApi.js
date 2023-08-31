import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const beersApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3005'
	}),
	reducerPath: 'beers',
	endpoints(builder) {
		return {
			addBeer: builder.mutation({
				invalidatesTags: ['Beers'],
				query: (beer) => {
					return {
						body: {
							abv: beer.abv,
							brewery: beer.brewery,
							location: beer.location,
							name: beer.name,
							quantity: beer.quantity,
							size: beer.size,
							stylePrimary: beer.stylePrimary,
							styleSecondary: beer.styleSecondary,
							vintage: beer.vintage
						},
						method: 'POST',
						url: '/beers'
					};
				}
			}),
			getBeers: builder.query({
				providesTags: ['Beers'],
				query: () => {
					return {
						method: 'GET',
						url: '/beers'
					};
				}
			})
		};
	}
});

export const { useAddBeerMutation, useGetBeersQuery } = beersApi;
export { beersApi };
