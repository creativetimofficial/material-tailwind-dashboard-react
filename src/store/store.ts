import { configureStore } from '@reduxjs/toolkit';
import { azureApi } from './services/azure-api-service';
import { azureOrganizationApi } from './services/azure-organization-service';

export const store = configureStore({
  reducer: {
    [azureApi.reducerPath]: azureApi.reducer,
    [azureOrganizationApi.reducerPath]: azureOrganizationApi.reducer, // Add azureOrganizationApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(azureApi.middleware)
      .concat(azureOrganizationApi.middleware), // Add azureOrganizationApi middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
