import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { beersApi } from './apis/beersApi';
import { breweriesApi } from './apis/breweriesApi';
import { stylesApi } from './apis/stylesApi';
import { cellarsApi } from './apis/cellarsApi';

export const store = configureStore({
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(beersApi.middleware)
			.concat(breweriesApi.middleware)
			.concat(cellarsApi.middleware)
			.concat(stylesApi.middleware);
	},
	reducer: {
		[beersApi.reducerPath]: beersApi.reducer,
		[breweriesApi.reducerPath]: breweriesApi.reducer,
		[cellarsApi.reducerPath]: cellarsApi.reducer,
		[stylesApi.reducerPath]: stylesApi.reducer
	}
});

setupListeners(store.dispatch);

export {
	useAddBeerMutation,
	useDrinkBeerMutation,
	useGetBeersQuery,
	useGetBeersByUserQuery
} from './apis/beersApi';

export { useGetBreweriesQuery } from './apis/breweriesApi';

export {
	useAddCellarMutation,
	useDeleteCellarMutation,
	useGetCellarsByUserQuery,
	useUpdateCellarMutation
} from './apis/cellarsApi';

export { useGetStylesQuery } from './apis/stylesApi';
