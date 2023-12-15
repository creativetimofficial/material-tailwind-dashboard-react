import { AxiosRequestConfig } from "axios";
import instance from "..";

type CreateAgentDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
type UpdateAgentDto = null;

/**
 * This function creates agent on the server.
 * @param payload DTO for creating agent.
 */
export async function createAgent(payload: CreateAgentDto) {
  try {
    const response = await instance.post("/users/agents", payload);

    if (response.status === 201) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error creating agent.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error creating agent.",
    };
  }
}

/**
 * This function update agent on the server.
 * @param payload DTO for updating agent.
 */
export async function updateAgent(id: string, payload: UpdateAgentDto) {
  try {
    const response = await instance.patch(`/users/agents/${id}`, payload);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error updating agent.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error updating agent.",
    };
  }
}

/**
 * This function loads agents from the server.
 */
export async function findAllAgents() {
  try {
    const response = await instance.get("/users/agents");

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading agent.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading agent.",
    };
  }
}

/**
 * Delete a agent
 * @param id Id of the agent to delete
 * @returns
 */
export async function deleteAgent(id: string) {
  try {
    const response = await instance.delete(`/agents/${id}`);

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error deleting agent.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error deleting agent.",
    };
  }
}

/**
 * This function loads paginated agents from the server.
 */
export async function findAgentsWithPagination(offset: number, limit: number) {
  try {
    const params = {
      offset,
      limit,
    };

    const config: AxiosRequestConfig = {
      params,
    };

    const response = await instance.get("/agents", config);

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading agents.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading agents.",
    };
  }
}

/**
 * This function get by id a agent on the server.
 *  @param id Id of the agent to retrieve
 *
 */
export async function getAgent(id: string) {
  try {
    const response = await instance.get(`/agents/${id}`);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error getting agent.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error getting agent.",
    };
  }
}
