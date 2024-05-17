import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import { ApiSlice } from './slices/ApiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [ApiSlice.reducerPath]: ApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools: true,
});

export default store;