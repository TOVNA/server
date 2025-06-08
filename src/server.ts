import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import express, { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import studentsRoute from "./routes/studentsRoute";
import goalsRoute from "./routes/goals_route";
import strategiesRoute from "./routes/strategies_routes";
import studentStatusSnapshot from "./routes/studentStatusSnapshot_route";
import schoolClass_route from "./routes/schoolClass_route";
import teachersRoute from "./routes/teachers_route";
import authRouter from "./routes/auth_route";
import questionRoute from "./routes/question_route";
import classSubjectRoutes from "./routes/classSubject_route";
import questionnaireRoute from "./routes/questionnaire_route";
import questionnaireAnswerRoute from "./routes/questionnaireAnswer_route"



const app: Express = express();

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TOVNA 2025 REST API",
      version: "1.0.0",
      description: "REST server for TOVNA project",
    },
    servers: [{ url: `http://localhost:${process.env.PORT}` }],
  },
  apis: ["./src/routes/*.ts"],
};
const specs = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/students", studentsRoute);
app.use("/goals", goalsRoute);
app.use("/strategies", strategiesRoute);
app.use("/status-snapshot", studentStatusSnapshot);
app.use("/teachers", teachersRoute);
app.use("/school-class", schoolClass_route);
app.use("/auth", authRouter);
app.use("/class-subject", classSubjectRoutes);
app.use("/questions", questionRoute);
app.use("/questionnaire", questionnaireRoute);
app.use("/questionnaire-answer", questionnaireAnswerRoute);


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
      throw new Error(
        "Failed to connect to MongoDB: An unknown error occurred"
      );
    }
  }
};

export default initApp;
