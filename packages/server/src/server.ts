import cookieParser from "cookie-parser";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import morgan from "morgan";
import env from "./config/env";
import { context } from "./graphql/context/context";
import schema from "./graphql/schema";
import pitchTable from "./Tables/pitchTable";

const app = express();

// util
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


const rootValue = {
  pitch: async (_id: string) => {
    const jfjfj = { _id: 12, name: "murhaf" };
    const pitchRecord = await pitchTable.find({ _id });
    console.log(jfjfj, _id, pitchRecord);
    return jfjfj;
  },
};

app.use(morgan("tiny"));

app.use(
  "/graphql",
  graphqlHTTP({
    context,
    schema,
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
