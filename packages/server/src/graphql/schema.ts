import { query } from "./query";
import { pitchesQL, subPitchQL } from "./types";

export const schema = `
    ${pitchesQL}

    ${subPitchQL}

    ${query}
`;
