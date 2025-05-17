import { User } from "../../models/User";
import bcrypt from "bcrypt";
import { generateToken, generateRefreshToken } from "../../utils/jwtUtils";

export const login = async (email: string, password: string) => {
  try {
    let found = await User.findOne({ where: { email: email } });

    // Vérifier si l'utilisateur existe
    if (!found) {
      throw new Error("User not Found");
    }

    // Vérifier si le mot de passe de l'utilisateur est défini et valide
    if (!found.password) {
      throw new Error("Password not found in database");
    }

    // Vérifier si le mot de passe envoyé est défini et non vide
    if (!password || password.trim() === "") {
      throw new Error("Password is required");
    }
    // Comparer le mot de passe envoyé avec celui dans la base de données
    const isPasswordMatch = await bcrypt.compare(password, found.password);

    if (!isPasswordMatch) {
      throw new Error("Wrong Password");
    }

    // Générer les tokens
    const token = generateToken(found);
    const refresh = generateRefreshToken(found);

    // Mettre à jour le refreshToken dans la base de données
    await found.update({ refreshToken: refresh });

    return { token, refresh, user: found };
  } catch (error: any) {
    console.error("Error:", error.message);
    throw new Error(error.message);
  }
};
