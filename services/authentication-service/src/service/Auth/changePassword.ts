import { User } from "../../models/User"; // Assure-toi que le chemin d'importation est correct
import bcrypt from "bcrypt";
import { IUser } from "../../interface/IUser";

async function changePassword(Password: string, id: string): Promise<boolean> {
  try {
    const found: User | null = await User.findByPk(id); // Trouve l'utilisateur par ID
    console.log(found);

    if (!found) {
      throw new Error("User not Found");
    }

    const salt: string = await bcrypt.genSalt(); // Génère le sel pour le hashage
    const hashedPassword: string = await bcrypt.hash(Password, salt); // Hash le mot de passe
    console.log("Password encrypted");

    found.password = hashedPassword; // Met à jour le mot de passe de l'utilisateur
    await found.save(); // Sauvegarde les changements dans la base de données
    console.log("Password saved");

    return found.password === hashedPassword; // Vérifie si le mot de passe enregistré est identique à celui hashé
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw new Error("Internal Server Error");
  }
}

export { changePassword };
