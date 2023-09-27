import instance from "..";

/**
 * Function to upload one or more files to the remote server.
 * @param formData
 * @param multiple
 * @returns
 */
export async function uploadFile(formData: FormData, multiple: boolean = false) {
  try {
    const response = await instance.post(
      `/uploads/file${multiple && "s"}`,
      formData,
    );

    if (response.status === 201) {
      return {
        data: response.data,
      };
    }

    return {
      error: `Error upload file${multiple && "s"}`,
    };
  } catch (error) {
    console.log(error);

    return {
      error: `Error upload file${multiple && "s"}`,
    };
  }
}
