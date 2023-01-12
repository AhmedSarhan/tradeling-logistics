import { AxiosError } from "axios";
import Axios from "@root/api/axios";
import { ICountries } from "./types";

export const fetchCountries = async () => {
  try {
    const response = await Axios.get("/countries");
    if (response.data.status !== "OK") {
      throw new Error("something went wrong please try again");
    }
    const data = response.data.data;
    const countries = Object.entries(data).map(([key, value]) => {
      return {
        code: key,
        // @ts-ignore
        country: value.country,
        // @ts-ignore
        region: value.region,
      };
    });
    return countries as ICountries[];
  } catch (err) {
    const error = (err as unknown) as AxiosError;
    throw new Error(error.message || "something went wrong please try again");
  }
};
