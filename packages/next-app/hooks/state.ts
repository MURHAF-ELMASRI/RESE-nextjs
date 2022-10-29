import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { TypedUseSelectorHook } from "react-redux"
import { AppDispatch, RootState } from "src/state/store"



export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
