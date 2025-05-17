import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const sendEmail = async ({
  to,
  subject,
  html,
}: EmailOptions): Promise<void> => {
  try {
    console.log(`Preparing to send email to: ${to}, subject: ${subject}`);

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
      },
    });

    // Verify transporter configuration
    console.log(
      `Email transporter configured with user: ${process.env.USER_MAIL}`
    );

    // Send email
    await transporter.sendMail({
      from: `"Meeting Scheduler" <${process.env.USER_MAIL}>`,
      to,
      subject,
      html,
    });

    console.log(`Email successfully sent to: ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    throw new Error("Failed to send email");
  }
};

export { sendEmail };
