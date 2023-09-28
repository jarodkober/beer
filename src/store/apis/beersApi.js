import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const beersApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://192.168.1.9:3005'
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
							beer_name: beer.beer_name,
							beer_quantity: beer.beer_quantity,
							beer_size: beer.beer_size,
							beer_style: beer.beer_style,
							beer_vintage: beer.beer_vintage,
							brewery_name: beer.brewery_name,
							cellar_name: beer.cellar_name
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
			})
		};
	}
});

export const { useAddBeerMutation, useGetBeersQuery, useDrinkBeerMutation } =
	beersApi;
export { beersApi };
