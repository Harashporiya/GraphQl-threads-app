import express from "express";
const {expressMiddleware} =require("@apollo/server/express4")
import bodyParser from "body-parser";
import cors from "cors";
import crateApolloGraphqlServer from "./graphql";


async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  

  app.get("/", async (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.use(bodyParser.json())
  app.use(cors())

  // GraphQL endpoint
  app.use("/graphql", expressMiddleware(await crateApolloGraphqlServer()))

  app.listen(PORT, () => {
    console.log(`Server Started At PORT: ${PORT}`);
  });
}

init()