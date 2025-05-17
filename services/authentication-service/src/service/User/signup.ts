import { User } from "../../models/User";
import { IUser, UserRole } from "../../interface/IUser";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwtUtils";
import { sendMail, MailContent } from "../../utils/Mail";
import dotenv from "dotenv";

dotenv.config();
interface SignupData {
  username: string;
  password: string;
  email: string;
  role: UserRole;
}

interface ActivationResponse {
  savedUser: IUser;
  token: string;
}

export async function signup(
  userData: SignupData
): Promise<ActivationResponse> {
  try {
    const { username, email, role, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User with this email already exists!");
    }

    // Check if password is provided
    if (!password || password.trim() === "") {
      throw new Error("Password is required.");
    }

    // Hash password securely
    const salt = await bcrypt.genSalt(10);
    if (!salt) {
      throw new Error("Failed to generate salt.");
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user in MySQL
    const savedUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role,
    });

    // Generate JWT Token
    const token = generateToken({
      id: savedUser.id,
      email: savedUser.email,
      username: savedUser.username,
      password: savedUser.password,
      role: savedUser.role,
    });

    const activationLink = `${process.env.HOST}/activate-account/${email}/${token}`;
    const destination = email;
    const subject = "Your Account Beams Wind-Consulting";

    const content: MailContent = {
      message: `
        <p>Hello ${username},</p>
        <p>Thank you for registering!</p>
        <p>Voici vos informations de connexion :</p>
        <ul>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Password :</strong> ${password}</li>
        </ul>
      `,
      link: activationLink,
    };

    await sendMail(destination, subject, content);

    return { savedUser: savedUser.get({ plain: true }) as IUser, token };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function activate(user: IUser, token: string): Promise<string> {
  try {
    const activationLink = `${process.env.HOST}/activate-account/${user.id}/${token}`;
    const destination = user.email;
    const subject = "Your Account Beams Wind-Consulting";

    const content: MailContent = {
      message: `
        <p>Hello ${user.username},</p>
        <p>Thank you for registering! Please click the link below to activate your account:</p>
        <a href="${activationLink}" style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none;">Activate Account</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Voici vos informations de connexion :</p>
        <ul>
          <li><strong>Email :</strong> ${user.email}</li>
        </ul>
        
      `,
      link: activationLink, 
    };

    await sendMail(destination, subject, content);

    return "Activation email sent successfully!";
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
