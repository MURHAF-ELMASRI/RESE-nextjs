import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import morgan from "morgan";
import CORS_WHITELIST from "./config/CORS_WHITELIST";
import env from "./config/env";
import schema from "./graphql/schema";

const app = express();

// util
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (
      requestOrigin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ): void => {
      if (requestOrigin && CORS_WHITELIST.indexOf(requestOrigin) === -1) {
        console.log({ requestOrigin });
        const message =
          "The CORS policy for this origin doesn't allow access from the particular origin.";
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

const rootValue = {
  pitch: () => {
    console.log("hello world");
    return { _id: "helloworld", name: "hi" };
  },
};

app.use(morgan("tiny"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "server is working" });
});

const PORT = env.port || 5000;
const MONGODB_URL = env.mongoURI || "";
// Connect to MongoDB
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("MongoDB is connected successfully.");
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: unknown) => {
    // eslint-disable-next-line no-console
    console.error(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    process.exit();
  });
