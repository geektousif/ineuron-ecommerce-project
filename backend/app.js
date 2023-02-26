import express from "express";
import cookeParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookeParser());

// morgan logger
app.use(morgan("tiny"));

export default app;
