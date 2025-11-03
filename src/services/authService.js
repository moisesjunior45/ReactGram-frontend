import { api, requestConfig } from "../utils/config";

// Register an user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(`${api}/users/register`, config);
    const result = await res.json();

    if (result.token) {
      localStorage.setItem("user", JSON.stringify(result));
    }

    return result;
  } catch (error) {
    console.error(error);
    return { errors: [error.message] };
  }
};

// Logout an user
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in an user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(`${api}/users/login`, config);
    const result = await res.json();

    if (result.token) {
      localStorage.setItem("user", JSON.stringify(result));
    }

    return result;
  } catch (error) {
    console.error(error);
    return { errors: [error.message] };
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
