import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const sizesApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL
	}),
	reducerPath: 'sizes',
	endpoints(builder) {
		return {
			getSizes: builder.query({
				query: (user) => {
					return {
						headers: {
							Authorization: user.user_auth
						},
						method: 'GET',
						url: '/sizes'
					};
				}
			})
		};
	}
});

export const { useGetSizesQuery } = sizesApi;

export { sizesApi };
