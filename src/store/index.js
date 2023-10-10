import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { beersApi } from './apis/beersApi';
import { cellarsApi } from './apis/cellarsApi';

export const store = configureStore({
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(beersApi.middleware)
			.concat(cellarsApi.middleware);
	},
	reducer: {
		[beersApi.reducerPath]: beersApi.reducer,
		[cellarsApi.reducerPath]: cellarsApi.reducer
	}
});

setupListeners(store.dispatch);

export {
	useAddBeerMutation,
	useDrinkBeerMutation,
	useGetBeersQuery
} from './apis/beersApi';

export {
	useAddCellarMutation,
	useDeleteCellarMutation,
	useGetCellarsQuery,
	useUpdateCellarMutation
} from './apis/cellarsApi';
