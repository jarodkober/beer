import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { beersApi } from './apis/beersApi';
import { breweriesApi } from './apis/breweriesApi';
import { cellarsApi } from './apis/cellarsApi';
import { sizesApi } from './apis/sizesApi';
import { stylesApi } from './apis/stylesApi';

export const store = configureStore({
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(beersApi.middleware)
			.concat(breweriesApi.middleware)
			.concat(cellarsApi.middleware)
			.concat(sizesApi.middleware)
			.concat(stylesApi.middleware);
	},
	reducer: {
		[beersApi.reducerPath]: beersApi.reducer,
		[breweriesApi.reducerPath]: breweriesApi.reducer,
		[cellarsApi.reducerPath]: cellarsApi.reducer,
		[sizesApi.reducerPath]: sizesApi.reducer,
		[stylesApi.reducerPath]: stylesApi.reducer
	}
});

setupListeners(store.dispatch);

export {
	useAddBeerToCellarMutation,
	useUpdateBeerInCellarMutation,
	useGetBeersByUserQuery
} from './apis/beersApi';

export {
	useAddBreweryMutation,
	useGetBreweriesQuery
} from './apis/breweriesApi';

export {
	useAddCellarMutation,
	useDeleteCellarMutation,
	useGetCellarsByUserQuery,
	useUpdateCellarMutation
} from './apis/cellarsApi';

export { useGetSizesQuery } from './apis/sizesApi';

export { useGetStylesQuery } from './apis/stylesApi';
