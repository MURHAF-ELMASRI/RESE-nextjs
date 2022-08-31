import { gql } from "@apollo/client";

// import { SignupProps } from "@rese/common/api/signup";
// import { verifyCodeArgs } from "@rese/common/api/verifyCode";

// function createAPI() {
//   const API = axios.create({
//     baseURL: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`,
//   });

//   API.interceptors.request.use((req) => {
//     if (localStorage.getItem("token") && req.headers) {
//       req.headers.token = localStorage.getItem("token")!;
//     }
//     return req;
//   });
//   return API;
// }

// export const API=createAPI()

// export const signUp = (formData: SignupProps) =>
//   API.post("/user/signup", formData);

// export const verifyCode = (formData: verifyCodeArgs) =>
//   API.post("/user/verifyCode", formData);

// export const resendConfirmationCode = () => API.get("/user/resendCode");

// export const createPitch = (formDate) =>
//   API.post("/pitch/createPitch", formDate);

// export const signIn = (formData) => API.post("/user/signin", formData);

const pitchQL = gql`
  query {
    pitch {
      _id
      name
    }
  }
`;
const queryQL = {
  query: {
    pitch: pitchQL,
  },
};

export default queryQL
