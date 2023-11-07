import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const beersApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL
	}),
	reducerPath: 'beers',
	endpoints(builder) {
		return {
			addBeerToCellar: builder.mutation({
				invalidatesTags: ['Beers'],
				query: (beer) => {
					return {
						body: {
							beer_abv: beer.beer_abv,
							beer_cost: beer.beer_cost || 0,
							beer_name: beer.beer_name,
							beer_quantity: beer.beer_quantity,
							beer_size_id: beer.beer_size_id,
							beer_style_id: beer.beer_style_id,
							beer_vintage: beer.beer_vintage,
							brewery_id: beer.brewery_id,
							cellar_id: beer.cellar_id
						},
						headers: {
							Authorization: beer.user_auth
						},
						method: 'POST',
						url: `/user/${beer.user_id}/beers`
					};
				}
			}),
			drinkBeer: builder.mutation({
				invalidatesTags: ['Beers'],
				query: ({
					beer_cellars_id,
					beer_quantity,
					beer_quantity_consumed,
					user_auth,
					user_id
				}) => {
					return {
						body: {
							beer_quantity,
							beer_quantity_consumed
						},
						headers: {
							Authorization: user_auth
						},
						method: 'PATCH',
						url: `/user/${user_id}/beers/${beer_cellars_id}`
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
	useAddBeerToCellarMutation,
	useDrinkBeerMutation,
	useGetBeersByUserQuery
} = beersApi;
export { beersApi };
