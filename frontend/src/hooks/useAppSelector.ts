import type { RootState } from "../app/store";
import { useSelector } from "react-redux";

export const useAppDispatch = useSelector.withTypes<RootState>();
