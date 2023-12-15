import { AxiosRequestConfig } from "axios";
import instance from "..";

type CreateFacultyDto = {
  name: string;
};
type UpdateFacultyDto = null;

/**
 * This function creates faculty on the server.
 * @param payload DTO for creating faculty.
 */
export async function createFaculty(payload: CreateFacultyDto) {
  try {
    const response = await instance.post("/faculties", payload);

    if (response.status === 201) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error creating faculty.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error creating faculty.",
    };
  }
}

/**
 * This function update faculty on the server.
 * @param payload DTO for updating faculty.
 */
export async function updateFaculty(id: string, payload: UpdateFacultyDto) {
  try {
    const response = await instance.patch(`/faculties/${id}`, payload);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error updating faculty.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error updating faculty.",
    };
  }
}

/**
 * This function loads faculties from the server.
 */
export async function findAllFaculties() {
  try {
    const response = await instance.get("/faculties");

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading faculty.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading faculty.",
    };
  }
}

/**
 * Delete a faculty
 * @param id Id of the faculty to delete
 * @returns
 */
export async function deleteFaculty(id: string) {
  try {
    const response = await instance.delete(`/faculties/${id}`);

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error deleting faculty.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error deleting faculty.",
    };
  }
}

/**
 * This function loads paginated faculties from the server.
 */
export async function findFacultysWithPagination(offset: number, limit: number) {
  try {
    const params = {
      offset,
      limit,
    };

    const config: AxiosRequestConfig = {
      params,
    };

    const response = await instance.get("/faculties", config);

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading faculties.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading faculties.",
    };
  }
}

/**
 * This function get by id a faculty on the server.
 *  @param id Id of the faculty to retrieve
 *
 */
export async function getFaculty(id: string) {
  try {
    const response = await instance.get(`/faculties/${id}`);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error getting faculty.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error getting faculty.",
    };
  }
}
