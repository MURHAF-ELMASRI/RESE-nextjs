import { buildSchema } from "graphql";
import { query } from "./query";
import { pitchesQL, subPitchQL } from "./types";

const schema = `
    ${pitchesQL}

    ${subPitchQL}

    ${query}
`;

export default buildSchema(schema);
