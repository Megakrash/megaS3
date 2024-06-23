import express from "express";
import cors, { CorsOptions } from "cors";
import path from "path";
import { expressMiddlewares } from "./routes";

const app = express();
const port = process.env.APP_PORT || 5005;
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  process.env.TGC_RELEASE_URL || "https://tgc-release.megakrash.fr",
  process.env.TGC_PROD_URL || "https://tgc.megakrash.fr",
];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins.join(","));
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

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
