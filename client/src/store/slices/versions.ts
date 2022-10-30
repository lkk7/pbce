import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

interface VersionsState {
  selectedVersions: string[];
}

const initialState: VersionsState = {
  selectedVersions: ["all"],
};

export const versionsSlice = createSlice({
  name: "selectedVersions",
  initialState: initialState,
  reducers: {
    setSelectedVersions: (state, action: PayloadAction<string[]>) => {
      state.selectedVersions = action.payload;
    },
  },
});

export const { setSelectedVersions } = versionsSlice.actions;
export const selectedVersionsSelector = (state: RootState) =>
  state.versions.selectedVersions;
export const versionsReducer = versionsSlice.reducer;
