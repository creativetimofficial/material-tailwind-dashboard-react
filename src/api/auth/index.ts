import instance from "..";

/**
 * Function used to login the agent or the admin
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const login = async (email: string, password: string) => {
  try {
    const response = await instance.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    if (response.status === 200) {
      return { data: true, user: response.data };
    }

    return { data: false };
  } catch (error) {
    console.error(error);

    return { error: error };
  }
};

/**
 * Function used to logout the agent or the admin
 * @returns
 */
export const logout = async () => {
  try {
    const response = await instance.post("/auth/logout");

    if (response.status === 200) {
      return { data: true };
    }

    return { data: false };
  } catch (error) {
    console.error(error);

    return { error: error };
  }
}

/**
 * Function used retrieve information about the current agent or the admin
 * @returns
 */
export const getMe = async () => {
  try {
    const response = await instance.get("users/admins/me", {
      headers: {
        "Access-Control-Allow-Credentials": true,
      },
    });

    if (response.status === 200) {
      return { data: true, user: response.data };
    }

    return { data: false };
  } catch (error) {
    console.error(error);

    return { error: error };
  }
};
