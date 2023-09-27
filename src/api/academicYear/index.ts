import { AxiosRequestConfig } from "axios";
import instance from "..";

type CreateAcademicYearDto = null;
type UpdateAcademicYearDto = null;

/**
 * This function creates academic year on the server.
 * @param payload DTO for creating academic year.
 */
export async function createAcademicYear(payload: CreateAcademicYearDto) {
  try {
    const response = await instance.post("/academicYears", payload);

    if (response.status === 201) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error creating academic year.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error creating academic year.",
    };
  }
}

/**
 * This function update academic year on the server.
 * @param payload DTO for updating academic year.
 */
export async function updateAcademicYear(
  id: string,
  payload: UpdateAcademicYearDto,
) {
  try {
    const response = await instance.patch(`/academicYears/${id}`, payload);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error updating academic year.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error updating academic year.",
    };
  }
}

/**
 * This function loads academic years from the server.
 */
export async function findAllAcademicYears() {
  try {
    const response = await instance.get("/academicYears");

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading academic year.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading academic year.",
    };
  }
}

/**
 * Delete a agent
 * @param id Id of the agent to delete
 * @returns
 */
export async function deleteAcademicYear(id: string) {
  try {
    const response = await instance.delete(`/academicYears/${id}`);

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error deleting academic year.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error deleting academic year.",
    };
  }
}

/**
 * This function loads paginated academic years from the server.
 */
export async function findAcademicYearsWithPagination(
  offset: number,
  limit: number,
) {
  try {
    const params = {
      offset,
      limit,
    };

    const config: AxiosRequestConfig = {
      params,
    };

    const response = await instance.get("/academicYears", config);

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading academic years.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading academic years.",
    };
  }
}

/**
 * This function get by id a academic year on the server.
 *  @param id Id of the agent to retrieve
 *
 */
export async function getAcademicYear(id: string) {
  try {
    const response = await instance.get(`/academicYears/${id}`);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error getting academic year.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error getting academic year.",
    };
  }
}
