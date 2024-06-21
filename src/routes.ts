import { Express, Request, Response } from "express";
import { uploadPicture } from "./services/multer.services";

export function expressMiddlewares(app: Express) {
  app.post(
    "/pictures",
    uploadPicture.single("file"),
    async (req: Request, res: Response) => {
      if (req.file) {
        try {
          const pictureData = { filename: req.file.filename };
          res.json(pictureData);
        } catch (error) {
          res.status(500).send("Error saving picture");
        }
      } else {
        res.status(400).send("No file was uploaded.");
      }
    }
  );
}
