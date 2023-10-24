import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const stylesApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_BASE_URL
	}),
	reducerPath: 'styles',
	endpoints(builder) {
		return {
			getStyles: builder.query({
				query: (user) => {
					return {
						headers: {
							Authorization: user.user_auth
						},
						method: 'GET',
						url: '/styles'
					};
				}
			})
		};
	}
});

export const { useGetStylesQuery } = stylesApi;

export { stylesApi };
