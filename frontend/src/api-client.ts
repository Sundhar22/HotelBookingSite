import { RegisterType } from "./pages/register";
import { SignInFormData } from "./pages/SignIn";
import {HotelType} from "../../backend/src/models/HotelType";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string || "";

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

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("An error occurred while signing out");
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error("Invalid Credentials");
  }
  return response.json();
};

export const addHotel = async (data: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",

    credentials: "include",
    body: data,
  });

  if (!response.ok) {
    throw new Error("An error occurred while adding hotel");
  }

  return response.json();
};

export const getMyHotel = async():Promise<HotelType[]>=>{
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
    credentials:"include",
  });


  if(!response.ok){
    throw new Error("An error occurred while fetching hotels")
  }

  return response.json();

}
