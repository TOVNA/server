import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import express, { Express } from "express";
//import posts_route from "./routes/post_route";
//import comments_route from "./routes/comment_route";
//import user_route from "./routes/user_route";
//import files_route from "./routes/files_route";
//import swaggerJSDoc from "swagger-jsdoc";
//import swaggerUI from "swagger-ui-express";
import path from "path";

const app: Express = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*app.use("/posts", posts_route);
app.use("/comments", comments_route);
app.use("/auth", user_route);
app.use("/file", files_route);

app.use("/users", express.static(path.join(process.cwd(), "public", "users")));

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Final Project 2025 REST API',
      version: '1.0.0',
      description: 'REST server including authentication using JWT',
    },
    servers: [{ url: `http://localhost:${process.env.PORT}`}, {url: ` http://node14.cs.colman.ac.il:${process.env.PORT}` }, {url: `https://node14.cs.colman.ac.il:${process.env.HTTPS_PORT}`}], 
  },
  apis: ['./src/routes/*.ts'], 
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
*/

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const initApp = async (): Promise<Express> => {
  if (!process.env.DB_CONNECT) {
    throw new Error("Missing environment variables: DB_CONNECT");
  }

  try {
    await mongoose.connect(process.env.DB_CONNECT);
    return app;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Failed to connect to MongoDB: " + error.message);
    } else {
      throw new Error("Failed to connect to MongoDB: An unknown error occurred");
    }
  }
};

export default initApp;
