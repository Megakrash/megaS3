import express from "express";
import cors from "cors";
import path from "path";
import { expressMiddlewares } from "./routes";

const app = express();
const port = process.env.APP_PORT || 5005;

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  process.env.TGC_RELEASE_URL || "http://localhost:3000",
  process.env.TGC_PROD_URL || "http://localhost:3000",
];
const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

app.use(
  "/pictures",
  express.static(path.join(__dirname, "../public/pictures"))
);

app.get("/", (req, res) => {
  res.send("Bienvenue sur Mega-S3!");
});
expressMiddlewares(app);
app.listen(port, () => {
  console.log(`🚀 Server ready at port ${port} 🚀`);
});
