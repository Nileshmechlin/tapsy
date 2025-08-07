import express from "express";
import cors from "cors";
import mainRouter from "./routes/index.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",mainRouter);
app.get("/", (_req, res) => {
  res.send("Tapsy Backend is running!");
});

export default app;
