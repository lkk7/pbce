import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

export interface VersionsState {
  selectedVersions: string[];
}

const initialState: VersionsState = {
  selectedVersions: [],
};

export const selectedVersionsSlice = createSlice({
  name: "versions",
  initialState: initialState,
  reducers: {
    setSelectedVersions: (state, action: PayloadAction<string[]>) => {
      state.selectedVersions = action.payload;
    },
  },
});

export const { setSelectedVersions } = selectedVersionsSlice.actions;
export const selectedVersionsSelector = (state: RootState) =>
  state.versions.selectedVersions;
export const versionsReducer = selectedVersionsSlice.reducer;
