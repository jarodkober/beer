import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const beersApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL
	}),
	reducerPath: 'beers',
	endpoints(builder) {
		return {
			addBeer: builder.mutation({
				invalidatesTags: ['Beers'],
				query: (beer) => {
					return {
						body: {
							beer_abv: beer.beer_abv,
							beer_cost: beer.beer_cost,
							beer_name: beer.beer_name,
							beer_quantity: beer.beer_quantity,
							beer_size: beer.beer_size,
							beer_style_id: beer.beer_style_id,
							beer_vintage: beer.beer_vintage,
							brewery_id: beer.brewery_id,
							cellar_id: beer.cellar_id
						},
						method: 'POST',
						url: '/beers'
					};
				}
			}),
			drinkBeer: builder.mutation({
				invalidatesTags: ['Beers'],
				query: ({ id, quantity }) => {
					return {
						body: {
							beer_quantity: quantity,
							id
						},
						method: 'PATCH',
						url: `/beers/${id}`
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
			}),
			getBeersByUser: builder.query({
				providesTags: ['Beers'],
				query: (user) => {
					return {
						headers: {
							Authorization: user.user_auth
						},
						method: 'GET',
						url: `/user/${user.user_id}/beers`
					};
				}
			})
		};
	}
});

export const {
	useAddBeerMutation,
	useDrinkBeerMutation,
	useGetBeersQuery,
	useGetBeersByUserQuery
} = beersApi;
export { beersApi };
