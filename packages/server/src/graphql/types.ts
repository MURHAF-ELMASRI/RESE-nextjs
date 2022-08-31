export const subPitchQL = `
    type SubPitch{
        _id:ID!
        pitchId:String
        name:String
    }
`;

export const pitchesQL = `
    type Pitch{
            _id:ID!
          mangerId: ID!
          name: String!
          location: String
          numberOfSubPitch: Number
          openAt: Number
          closeAt: Number
          paidServices:[String]
          freeServices:[String]
    }
`;
