import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { beersApi } from './apis/beersApi';

export const store = configureStore({
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(beersApi.middleware);
	},
	reducer: {
		[beersApi.reducerPath]: beersApi.reducer
	}
});

setupListeners(store.dispatch);

export { useGetBeersQuery } from './apis/beersApi';
