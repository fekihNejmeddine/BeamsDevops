import { User } from "../../models/User";
export async function Logout(cookies: { jwt?: string }): Promise<string> {
  if (!cookies?.jwt) {
    throw new Error("Aucun token de rafraîchissement fourni");
  }

  const refreshToken = cookies.jwt;
  console.log("Refresh Token reçu :", refreshToken); // Ajouter un log pour vérifier le token

  // Trouver l'utilisateur avec Sequelize
  const foundUser = await User.findOne({ where: { refreshToken } });

  if (!foundUser) {
    console.log("Utilisateur non trouvé pour ce refresh token :", refreshToken);
    throw new Error("Utilisateur non trouvé");
  }

  // Effacer le refreshToken
  foundUser.refreshToken = "";
  await foundUser.save();

  return "Token effacé";
}
