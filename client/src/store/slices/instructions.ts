import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

export type InstructionsForVersions = Record<string, string>;

interface InstructionsState {
  bytecodeInstructions: InstructionsForVersions;
}

const initialState: InstructionsState = {
  bytecodeInstructions: {},
};

export const instructionsSlice = createSlice({
  name: "disassembleResults",
  initialState: initialState,
  reducers: {
    setInstructions: (
      state,
      action: PayloadAction<InstructionsForVersions>
    ) => {
      state.bytecodeInstructions = action.payload;
    },
  },
});

export const { setInstructions } = instructionsSlice.actions;
export const instructionsSelector = (state: RootState) =>
  state.instructions.bytecodeInstructions;
export const instructionsReducer = instructionsSlice.reducer;
