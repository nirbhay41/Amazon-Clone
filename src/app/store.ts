import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import basketReducer from './slices/basketSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import renderReducer from './slices/renderSlice';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, basketReducer);

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export const store = configureStore({
    reducer: {
        basket: persistedReducer,
        render: renderReducer
    },
    middleware: customizedMiddleware,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;