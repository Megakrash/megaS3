import express from "express";
import cors from "cors";
import path from "path";
import { middlewares } from "./routes";
import { corsOptions } from "./corsConfig";

const app = express();
const port = process.env.APP_PORT || 5005;

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

app.use(
  "/pictures",
  express.static(path.join(__dirname, "../public/pictures"))
);

app.get("/", (req, res) => {
  res.send("Bienvenue sur Mega-S3!");
});
middlewares(app);
app.listen(port, () => {
  console.log(`🚀 Server ready at port ${port} 🚀`);
});
