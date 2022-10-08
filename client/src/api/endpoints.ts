import { instance } from "./instance";

export const getVersions = async () => {
  const response = await instance.get<string[]>("versions");
  return response.data;
};
