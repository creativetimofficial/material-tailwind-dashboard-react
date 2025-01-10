export interface Project {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface User {
    principalName: string;
    displayName: string;
    emailAddress: string;
    origin: string;
    originId: string;
  }

  export interface Repository {
    id: string; // Unique ID of the repository
    name: string; // Repository name
    url: string; // URL of the repository
    project: {
      id: string; // Project ID the repository belongs to
      name: string; // Project name
    };
    remoteUrl: string; // Remote URL for the repository (e.g., Git clone URL)
    defaultBranch: string; // Default branch of the repository
  }

  export interface Commit {
    commitId: string; // Unique ID of the commit
    comment: string; // Commit message
    author: {
      name: string; // Name of the author
      email: string; // Email of the author
      date: string; // Date and time of the commit (ISO format)
    };
    committer: {
      name: string; // Name of the committer (can differ from the author in some cases)
      email: string; // Email of the committer
      date: string; // Date and time of the commit by the committer
    };
    url: string; // URL to view the commit in Azure DevOps
  }
  
  