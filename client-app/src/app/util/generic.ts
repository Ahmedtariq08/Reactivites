/* Generic utility functions to be used across app */

import * as fs from "fs";
import * as path from "path";
const folderPath = "/assets/marvel/characters";
const defaultImage = "/assets/user.png";

/**
 * @returns Random image from /assets/marvel/characters
 */
export const getRandomUserImage = (): string => {
  if (!fs.existsSync(folderPath)) {
    console.error(`The folder "${folderPath}" does not exist.`);
    return defaultImage;
  }

  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|gif)$/i.test(path.extname(file))
  );

  if (imageFiles.length === 0) {
    console.error(`No image files found in the folder "${folderPath}".`);
    return defaultImage;
  }

  const randomIndex = Math.floor(Math.random() * imageFiles.length);
  const randomImagePath = path.join(folderPath, imageFiles[randomIndex]);
  return randomImagePath;
};
