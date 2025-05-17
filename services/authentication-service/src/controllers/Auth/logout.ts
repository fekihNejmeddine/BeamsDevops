import { Request, Response } from "express";
import { Logout as logoutService } from "../../service/Auth/logout";

// Définir l'interface pour les cookies de la requête
interface Cookies {
  jwt?: string;
}

const Logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const cookies: Cookies = req.cookies; // Extraire les cookies de la requête

    const status = await logoutService(cookies); // Appeler le service de déconnexion avec les cookies
    res.clearCookie("jwt", { httpOnly: true }); // Effacer le cookie JWT

    res.json({ status }); // Répondre avec le statut
  } catch (error) {
    console.error(
      "Erreur lors de la déconnexion:",
      error instanceof Error ? error.message : "Erreur inconnue"
    );
    res.status(401).json({ message: "Token de rafraîchissement invalide" });
  }
};

export { Logout };
