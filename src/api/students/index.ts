import { AxiosRequestConfig } from "axios";
import instance from "..";

type CreateStudentDto = null;
type UpdateStudentDto = null;

/**
 * This function creates student on the server.
 * @param payload DTO for creating student.
 */
export async function createStudent(payload: CreateStudentDto) {
  try {
    const response = await instance.post("/students", payload);

    if (response.status === 201) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error creating student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error creating student.",
    };
  }
}

/**
 * This function update student on the server.
 * @param payload DTO for updating student.
 */
export async function updateStudent(id: string, payload: UpdateStudentDto) {
  try {
    const response = await instance.patch(`/students/${id}`, payload);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error updating student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error updating student.",
    };
  }
}

/**
 * This function loads students from the server.
 */
export async function findAllStudents() {
  try {
    const response = await instance.get("/students");

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading students.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading students.",
    };
  }
}

/**
 * Delete a student
 * @param id Id of the student to delete
 * @returns
 */
export async function deleteStudent(id: string) {
  try {
    const response = await instance.delete(`/students/${id}`);

    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error deleting student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error deleting student.",
    };
  }
}

/**
 * This function loads paginated students from the server.
 */
export async function findStudentsWithPagination(offset: number, limit: number) {
  try {
    const params = {
      offset,
      limit,
    };

    const config: AxiosRequestConfig = {
      params,
    };

    const response = await instance.get("/students", config);

    if (response.status === 200) {
      return {
        data: response.data.data,
      };
    }

    return {
      error: "Error loading students.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error loading students.",
    };
  }
}

/**
 * This function get by id a student on the server.
 *  @param id Id of the student to retrieve
 *
 */
export async function getStudent(id: string) {
  try {
    const response = await instance.get(`/students/${id}`);
    if (response.status === 200) {
      return {
        data: response.data,
      };
    }

    return {
      error: "Error getting student.",
    };
  } catch (error) {
    console.log(error);

    return {
      error: "Error getting student.",
    };
  }
}
