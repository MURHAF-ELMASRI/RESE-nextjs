import { GraphQLNonNull } from 'graphql'
import { ExtendedQueryType } from "../queries/query"
import { newPitch } from "../types/input/newPitch"
import { pitchQL } from "../types/pitch"


const createPitch: ExtendedQueryType = {
    type: pitchQL,
    args: {
        input:new GraphQLNonNull(newPitch)
    },
    resolve: (_, { input },context)=>await context.repositories.pitch.
}


export default createPitch
