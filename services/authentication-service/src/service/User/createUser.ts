import { User } from "../../models/User";
import { IUser } from "../../interface/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MailContent, sendMail } from "../../utils/Mail";

// Generate a secure password
const generatePassword = (length: number = 12): string => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "=+-/*!?";
  const all = upper + lower + numbers + special;

  let password = "";
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};

const createUser = async (userData: IUser): Promise<IUser> => {
  try {
    const { username, lastName, email, role, Gender } = userData;

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error(
        "Cet email est déjà utilisé. Veuillez en choisir un autre."
      );
    }

    // Generate a password
    const plainPassword = generatePassword(12);

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // Create the user
    const newUser = await User.create({
      username,
      lastName,
      password: hashedPassword,
      email,
      role,
      Gender,
    });

    // Generate activation token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: "1d" }
    );

    // Activation link
    const activationLink = `${process.env.HOST}/activate-account/${email}/${token}`;

    // Email content
    const content: MailContent = {
      message: `
        <p>Hello ${username},</p>
        <p>Thank you for registering!</p>
        <p>Voici vos informations de connexion :</p>
        <ul>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Password :</strong> ${plainPassword}</li>
        </ul>
      `,
      link: activationLink,
    };

    // Send email
    await sendMail(email, "Your Account Beams Wind-Consulting", content);

    // Return user without password
    const savedUser = newUser.toJSON() as IUser;
    delete (savedUser as any).password;
    return savedUser;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export { createUser };
