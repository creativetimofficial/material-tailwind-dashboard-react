import React, { useState } from 'react';
///import { useFetchProjectsQuery, useFetchRepositoriesQuery, useFetchCommitsQuery } from '@/store/services/azure-api-service';

import { useFetchProjectsQuery } from "@/store/services/azure-api-service";

const CommitList = () => {
    const { data: projects } = useFetchProjectsQuery();
    const [selectedProject, setSelectedProject] = useState < string | null > (null);

    //   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedProject(event.target.value);
    //   };


    return (
        <div>
            <h1>Azure Commits</h1>

            <label>
                Select Project:
                <select
                    value={selectedProject || ''}
                // onChange={(e) => setSelectedProject(e.target.value)}
                >
                    <option value="">-- Select a Project --</option>
                    {projects?.map((project) => (
                        <option key={project.id} value={project.name}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </label>


            {/* Loading States */}
            {(isLoadingProjects) && (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CommitList;
