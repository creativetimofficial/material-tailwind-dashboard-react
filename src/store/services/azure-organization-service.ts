import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/types';

// Replace with your Azure DevOps organization name and personal access token
const organization = 'devops-ais';
const personalAccessToken = 'D1ijCqZTiu4U5ymKx8BwCCHXhQmKzZOt1cvwiaDvza7iF7qHvS5PJQQJ99AKACAAAAAAvEZnAAASAZDO3dIe';

// Create an RTK Query API
export const azureOrganizationApi = createApi({
  reducerPath: 'azureOrganizationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://vssps.dev.azure.com/${organization}/_apis/`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Basic ${btoa(`:${personalAccessToken}`)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      query: () => 'graph/users?api-version=7.1-preview.1',
      transformResponse: (response: any) => response.value, // Extract the users array
    }),
  }),
});

export const { useFetchUsersQuery } = azureOrganizationApi;
