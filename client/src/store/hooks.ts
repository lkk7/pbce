import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const typedUseDispatch: () => AppDispatch = useDispatch;
export const typedUseSelector: TypedUseSelectorHook<RootState> = useSelector;
