import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { TUser, logOut, setUser } from "../features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    // If no access token then logout the user (Thats mean access token in cooke expired)
    if (!data?.data?.accessToken) api.dispatch(logOut());

    // Decode the access Token
    const user = verifyToken(data.data.accessToken) as TUser;

    api.dispatch(
      setUser({
        user,
        token: data.data.accessToken,
      })
    );

    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["semester", "courses"],
  endpoints: () => ({}),
});
