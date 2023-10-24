import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { beersApi } from './apis/beersApi';
import { stylesApi } from './apis/stylesApi';
import { cellarsApi } from './apis/cellarsApi';

export const store = configureStore({
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(beersApi.middleware)
			.concat(stylesApi.middleware)
			.concat(cellarsApi.middleware);
	},
	reducer: {
		[beersApi.reducerPath]: beersApi.reducer,
		[stylesApi.reducerPath]: stylesApi.reducer,
		[cellarsApi.reducerPath]: cellarsApi.reducer
	}
});

setupListeners(store.dispatch);

export {
	useAddBeerMutation,
	useDrinkBeerMutation,
	useGetBeersQuery,
	useGetBeersByUserQuery
} from './apis/beersApi';

export { useGetStylesQuery } from './apis/stylesApi';

export {
	useAddCellarMutation,
	useDeleteCellarMutation,
	useGetCellarsByUserQuery,
	useUpdateCellarMutation
} from './apis/cellarsApi';
