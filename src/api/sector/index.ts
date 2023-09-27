import { AxiosRequestConfig } from "axios";
import instance from "..";

type CreateSectorDto = null;
type UpdateSectorDto = null;

/**
 * This function creates sector on the server.
 * @param payload DTO for creating sector.
 */
export async function createSector(payload: CreateSectorDto) {
  try {
    const response = await instance.post("/sectors", payload);

    if (response.status === 201) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error creating sector.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error creating sector.",
    };
  }
}

/**
 * This function update sector on the server.
 * @param payload DTO for updating sector.
 */
export async function updateSector(id: string, payload: UpdateSectorDto) {
  try {
    const response = await instance.patch(`/sectors/${id}`, payload);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error updating sector.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error updating sector.",
    };
  }
}

/**
 * This function loads sectors from the server.
 */
export async function findAllSectors() {
  try {
    const response = await instance.get("/sectors");

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading sectors.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading sectors.",
    };
  }
}

/**
 * Delete a sector
 * @param id Id of the sector to delete
 * @returns
 */
export async function deleteSector(id: string) {
  try {
    const response = await instance.delete(`/sectors/${id}`);

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error deleting sector.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error deleting sector.",
    };
  }
}

/**
 * This function loads paginated sectors from the server.
 */
export async function findSectorsWithPagination(offset: number, limit: number) {
  try {
    const params = {
      offset,
      limit,
    };

    const config: AxiosRequestConfig = {
      params,
    };

    const response = await instance.get("/sectors", config);

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading sectors.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading sectors.",
    };
  }
}

/**
 * This function get by id a sector on the server.
 *  @param id Id of the sector to retrieve
 *
 */
export async function getsector(id: string) {
  try {
    const response = await instance.get(`/sectors/${id}`);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error getting sector.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error getting sector.",
    };
  }
}
