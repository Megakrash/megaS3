import { Express, Request, Response } from "express";
import cors from "cors";
import { corsOptions } from "./corsConfig";
import {
  processImage,
  uploadPicture,
} from "./services/picture.upload.services";
import { deletePicture } from "./services/picture.delete.services";

export function middlewares(app: Express) {
  app.post(
    "/pictures",
    cors(corsOptions),
    uploadPicture.single("file"),
    async (req: Request, res: Response) => {
      await processImage(req, res);
    }
  );
  app.delete("/delete/:filename", async (req: Request, res: Response) => {
    if (req.params.filename) {
      try {
        const fileDeleted = await deletePicture(req.params.filename);
        if (fileDeleted) {
          res.json({ success: true, filename: fileDeleted });
        } else {
          res.status(404).send("File not found");
        }
      } catch (error) {
        res.status(500).send("Error removing picture");
      }
    } else {
      res.status(400).send("Filename is required");
    }
  });
}
