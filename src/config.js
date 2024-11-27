import { config } from "dotenv";
config();

export const BD_HOST =
  process.env.BD_HOST || "bhvt0xhjbmfrzmy1zcqs-mysql.services.clever-cloud.com";
export const BD_DATABASE = process.env.BD_DATABASE || "bhvt0xhjbmfrzmy1zcqs";
export const DB_USER = process.env.DB_USER || "uzgjeggtvzear7pp";
export const DB_PASSWORD = process.env.DB_PASSWORD || "kJr06aSLlsHsTo9mi0FA";
export const DB_PORT = process.env.DB_PORT || 3306;
export const PORT = process.env.PORT || 3000;
export const CLOUDINARY_CLOUD_NAME =
  process.env.CLOUDINARY_CLOUD_NAME || "api_2024";
export const CLOUDINARY_API_KEY =
  process.env.CLOUDINARY_API_KEY || "519959443575498";
export const CLOUDINARY_API_SECRET =
  process.env.CLOUDINARY_API_SECRET || "cpnkX0l9O1QIgA8iJn1rsVRyo1I";
