import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import bandReducer from './slices/bandSlice';
import rehearsalReducer from './slices/rehearsalSlice';
import setlistReducer from './slices/setlistSlice';
import uiReducer from './slices/uiSlice';
import { api } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bands: bandReducer,
    rehearsals: rehearsalReducer,
    setlists: setlistReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;