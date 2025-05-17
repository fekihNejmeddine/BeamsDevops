import jwt from "jsonwebtoken";
import { IUser } from "../interface/IUser";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY as string;
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY as string;

// Vérification de la présence des clés secrètes dans l'environnement
if (!ACCESS_SECRET_KEY || !REFRESH_SECRET_KEY) {
  console.error("Error: Missing JWT secret keys in environment variables.");
  process.exit(1); // Arrêter l'exécution si les clés ne sont pas définies
}

function generateToken(user: IUser): string {
  console.log("ACCESS_SECRET_KEY:", ACCESS_SECRET_KEY);

  // Créer un payload simplifié à partir de l'utilisateur
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,  // Ajoutez toutes les informations nécessaires
  };

  // Vérifiez que le payload est un objet simple
  if (typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Expected 'payload' to be a plain object.");
  }

  return jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: "5m" });
}

function generateRefreshToken(user: IUser): string {
  // Créer un payload simplifié pour le refresh token
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,  // Ajoutez toutes les informations nécessaires
  };

  if (typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Expected 'payload' to be a plain object.");
  }

  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: "1d" });
}


export { generateToken, generateRefreshToken };
