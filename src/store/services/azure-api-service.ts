import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Commit, Project, Repository } from '../types/types';

// Replace with your Azure DevOps organization name and personal access token
const organization = 'devops-ais';
const personalAccessToken = 'D1ijCqZTiu4U5ymKx8BwCCHXhQmKzZOt1cvwiaDvza7iF7qHvS5PJQQJ99AKACAAAAAAvEZnAAASAZDO3dIe';


export const azureApi = createApi({
  reducerPath: 'azureApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://dev.azure.com/${organization}/_apis/`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Basic ${btoa(`:${personalAccessToken}`)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchProjects: builder.query<Project[], void>({
      query: () => 'projects?api-version=7.1-preview.4',
      transformResponse: (response: any) => response.value, // Extract the projects array
    }),
    fetchRepositories: builder.query<Repository[], string>({
      // query: (projectName) =>
      //   `${projectName}/_apis/git/repositories?api-version=7.1-preview.1`,
      query: (projectName) => {
        const url = `${projectName}/_apis/git/repositories?api-version=7.1-preview.1`;
        console.log('Fetching repositories URL:', url);  // Log the final URL
        return url;
      },
      transformResponse: (response: any) => response.value, // Extract the repositories array
    }),
    fetchCommits: builder.query<Commit[], { projectName: string; repoId: string }>({
      // query: ({ projectName, repoId }) =>
      //   `${projectName}/_apis/git/repositories/${repoId}/commits?searchCriteria.fromDate=${new Date()
      //     .toISOString()
      //     .split('T')[0]}&api-version=7.1-preview.1`,
      query: ({ projectName, repoId }) => {
        const url = `${projectName}/_apis/git/repositories/${repoId}/commits?searchCriteria.fromDate=${new Date()
          .toISOString()
          .split('T')[0]}&api-version=7.1-preview.1`;
        console.log('Fetching commits URL:', url);  // Log the final URL
        return url;
      },
      transformResponse: (response: any) => response.value, // Extract the commits array
    }),
  }),
});


export const { useFetchProjectsQuery , useFetchRepositoriesQuery,
  useFetchCommitsQuery,} = azureApi;