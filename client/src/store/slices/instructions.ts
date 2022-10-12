import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";

export interface BytecodeInstruction {
  opcode: number;
  opname: string;
  arg?: number;
  argval: any;
  argrepr: string;
  offset: number;
  starts_line?: number;
  is_jump_target: boolean;
}

export interface InstructionsForVersions {
  [key: string]: BytecodeInstruction[];
}

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
