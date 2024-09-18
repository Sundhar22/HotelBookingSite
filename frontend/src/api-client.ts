import {
  HotelType,
  searchResponseType,
  UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./Forms/BookingForm/BookingForm";

import { RegisterType } from "./pages/register";
import { SignInFormData } from "./pages/SignIn";
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("An error occurred while fetching current user");
  } else {
    return response.json();
  }
};

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
    throw new Error("Error during sign out");
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

export const getMyHotel = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("An error occurred while fetching hotels");
  }

  return response.json();
};

export const getHotel = async (id: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("An error occurred while fetching hotel");
  }

  return response.json();
};

export const updatedHotel = async (data: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${data.get("hotelId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error("An error occurred while updating hotel");
  }

  return response.json();
};

export type SearchQueryPrams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultsCount?: string;
  childrenCount?: string;
  page?: string;
  type?: string[];
  facilities?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchData: SearchQueryPrams
): Promise<searchResponseType> => {
  const query = new URLSearchParams();
  query.append("destination", searchData.destination || "");
  query.append("checkIn", searchData.checkIn || "");
  query.append("checkOut", searchData.checkOut || "");
  query.append("adultCounts", searchData.adultsCount || "");
  query.append("childrenCounts", searchData.childrenCount || "");
  query.append("page", searchData.page || "");

  query.append("maxPrice", searchData.maxPrice || "");
  query.append("sortBy", searchData.sortOption || "");

  searchData.facilities?.forEach((facility) =>
    query.append("facilities", facility)
  );

  searchData.stars?.forEach((star) => query.append("starRatings", star));
  searchData.type?.forEach((type) => query.append("type", type));

  const response = await fetch(`${API_BASE_URL}/api/hotels/search?${query}`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("An error occurred while fetching hotels");
  }
  return response.json();
};

export const getHotelById = async (id: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/detail/${id}`);
  if (!response.ok) throw new Error("An error occurred while fetching hotels");

  return response.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfDays: string
) => {
  const res = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      body: JSON.stringify({ numberOfDays }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("An error occurred while creating payment intent");
  }

  return res.json();
};

/**
 * Creates a new booking for a given hotel.
 * @param {BookingFormData} data - Required fields: hotelId, paymentIntentId, userId, numberOfDays, checkIn, checkOut
 * @returns {Promise<BookingType>} A JSON response containing the newly created booking
 * @throws {Error} An error occurred while creating booking
 */
export const createBooking = async (data: BookingFormData) => {
  console.log(data);

  const res = await fetch(
    `${API_BASE_URL}/api/hotels/${data.hotelId}/bookings`,
    {
      credentials: "include",
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("An error occurred while creating booking");
  }

  return res.json();
};

export const fetchMyBookings = async ():Promise<HotelType[]> => {
  const res = await fetch(`${API_BASE_URL}/api/my-bookings/`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("An error occurred while fetching bookings");
  }

  return res.json();
};
export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};
