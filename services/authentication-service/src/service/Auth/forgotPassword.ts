import { User } from "../../models/User";
import crypto from "crypto";
import { sendMail } from "../../utils/Mail";

interface MailContent {
  message: string;
  link: string;
}

const forgotPassword = async (email: string): Promise<string> => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = new Date(Date.now() + 1 * 60 * 1000); // 1 hour

  await user.update({
    resetToken,
    resetTokenExpiry,
  });

  //const resetLink = `${process.env.HOST}/api/auth/reset-password/${resetToken}`;
  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
  const subject = "Reset your password";
  const content = `<p>Click the button below to reset your password.</p>     
         <p>You have requested to reset your password. Click the button below to set a new password. This link will expire in 1 hour for your security.</p>
`;
  const mailContent: MailContent = {
    message: content,
    link: resetLink,
  };

  await sendMail(user.email, subject, mailContent);

  return resetLink;
};
export { forgotPassword };
