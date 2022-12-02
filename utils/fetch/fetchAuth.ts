/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { IBasicApiResponse } from "../../interfaces/IBasicApiResponse";
import { IResetPaswwordForm } from "../../interfaces/IResetPasswordForm";
import ISignin from "../../interfaces/ISignin";
import ISignup from "../../interfaces/ISignup";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const signin = async (
  payload: ISignin
): Promise<{ access_token: string }> => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
};

export const signup = async (payload: ISignup): Promise<IBasicApiResponse> => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
};

export const askResetPassword = async (payload: {
  email: string;
}): Promise<IBasicApiResponse> => {
  const response = await fetch(
    `${API_URL}/auth/reset-password/send-token?email=${payload.email}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
};

export const resetPassword = async (
  payload: IResetPaswwordForm
): Promise<IBasicApiResponse> => {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
};
