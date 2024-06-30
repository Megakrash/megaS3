const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  process.env.TGC_RELEASE_URL || "http://localhost:3000",
  process.env.TGC_PROD_URL || "http://localhost:3000",
];
export const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
