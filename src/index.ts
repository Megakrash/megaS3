import express from "express";
import cors from "cors";
import path from "path";
import { expressMiddlewares } from "./routes";

const app = express();
const port = process.env.APP_PORT || 5005;
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  process.env.TGC_RELEASE_URL || "https://release-tgc.megakrash.fr",
  process.env.TGC_PROD_URL || "https://tgc.megakrash.fr",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json({ limit: "50mb" }));

app.options("*", cors());

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
