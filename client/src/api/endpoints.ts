import { InstructionsForVersions } from "store/slices/instructions";
import { instance } from "./instance";

export const getVersions = async () => {
  const response = await instance.get<string[]>("versions");
  return response.data;
};

export const getDisassembled = async (code: string, versions: string[]) => {
  const response = await instance.post<InstructionsForVersions>("disassemble", {
    code: code,
    versions: versions,
  });
  return response.data;
};
