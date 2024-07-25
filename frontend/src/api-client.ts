import { RegisterType } from "./pages/register";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const register = async (data: RegisterType) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  await response.json();

  if (!response.ok) {
    throw new Error("An error occurred while registering");
  }
};
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Invalid token");
  }
  return response.json();
};
