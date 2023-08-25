import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const beersApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3005'
	}),
	reducerPath: 'beers',
	endpoints(builder) {
		return {
			getBeers: builder.query({
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

export const { useGetBeersQuery } = beersApi;
export { beersApi };
