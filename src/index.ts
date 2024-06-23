import express from "express";
import cors, { CorsOptions } from "cors";
import path from "path";
import { expressMiddlewares } from "./routes";

const app = express();
const port = process.env.APP_PORT || 5005;
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  process.env.TGC_RELEASE_URL || "https://release-tgc.megakrash.fr",
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
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

app.use(
  "/pictures",
  express.static(path.join(__dirname, "../public/pictures"))
);
expressMiddlewares(app);
app.get("/", (req, res) => {
  res.send("Bienvenue sur Mega-S3!");
});

app.listen(port, () => {
  console.log(`🚀 Server ready at port ${port} 🚀`);
});
