import express from "express";
import cors from "cors";
import path from "path";
import { expressMiddlewares } from "./routes";

const app = express();
const port = process.env.APP_PORT || 5005;
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(
  "/pictures",
  express.static(path.join(__dirname, "../public/pictures"))
);
expressMiddlewares(app);
app.get("/", (req, res) => {
  res.send("Bienvenue sur MegaS3!");
});

app.listen(port, () => {
  console.log(`🚀 Server ready at port ${port} 🚀`);
});
