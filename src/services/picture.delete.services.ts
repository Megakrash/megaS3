import fsPromises from "fs/promises";
import path from "path";

export async function deletePicture(filename: string): Promise<string | null> {
  if (filename) {
    try {
      const filePath = path.join(
        __dirname,
        `../../public/pictures/${filename}`
      );
      await fsPromises.unlink(filePath);
      return filename;
    } catch (error: unknown) {
      console.error("Error removing picture", error);
      throw new Error("Error removing picture");
    }
  } else {
    throw new Error("Picture not found");
  }
}
