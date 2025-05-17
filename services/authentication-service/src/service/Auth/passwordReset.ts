import { User } from "../../models/User";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<void> {
  // Valider le mot de passe
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    throw new Error(
      "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character"
    );
  }

  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await user.update({
    password: hashedPassword,
    resetToken: null,
    resetTokenExpiry: null,
  });
}
