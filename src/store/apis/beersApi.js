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
			deleteBeer: builder.mutation({
				invalidatesTags: ['Beers'],
				query: (beer) => {
					return {
						body: {
							user_id: beer.user_id
						},
						headers: {
							Authorization: beer.user_auth
						},
						method: 'DELETE',
						url: `/beers/${beer.beer_id}`
					};
				}
			}),
			deleteBeerFromCellar: builder.mutation({
				invalidatesTags: ['Beers'],
				query: ({ beer_cellars_id, user_auth, user_id }) => {
					return {
						headers: {
							Authorization: user_auth
						},
						method: 'DELETE',
						url: `/user/${user_id}/beers/${beer_cellars_id}`
					};
				}
			}),
			getBeers: builder.query({
				providesTags: ['Beers'],
				query: (user) => {
					return {
						headers: {
							Authorization: user.user_auth
						},
						method: 'GET',
						url: `/beers`
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
			}),
			updateBeerInCellar: builder.mutation({
				invalidatesTags: ['Beers'],
				query: ({
					beer_cellars_id,
					beer_cost,
					beer_quantity,
					beer_quantity_consumed,
					beer_size_id,
					cellar_id,
					user_auth,
					user_id
				}) => {
					return {
						body: {
							beer_cost,
							beer_quantity,
							beer_quantity_consumed,
							beer_size_id,
							cellar_id
						},
						headers: {
							Authorization: user_auth
						},
						method: 'PATCH',
						url: `/user/${user_id}/beers/${beer_cellars_id}`
					};
				}
			})
		};
	}
});

export const {
	useAddBeerToCellarMutation,
	useDeleteBeerMutation,
	useGetBeersQuery,
	useGetBeersByUserQuery,
	useDeleteBeerFromCellarMutation,
	useUpdateBeerInCellarMutation
} = beersApi;
export { beersApi };
