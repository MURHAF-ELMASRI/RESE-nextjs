import { PitchType } from "@rese/common/model/Pitch";
import { axios } from "./axios";

export const api = {
    getPitches:()=>axios.get<PitchType[]>("/pitches")
}
