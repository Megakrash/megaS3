import { Express, Request, Response } from "express";
import { uploadPicture } from "./services/multer.services";
import { deletePicture } from "./services/deletePicture.services";

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
