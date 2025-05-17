import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface MailContent {
  message: string;
  link: string;
}

async function sendMail(
  destination: string,
  subject: string,
  content: MailContent
): Promise<void> {
  const mailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${subject}</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  <style type="text/css">
    /* Reset styles */
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: 'Roboto', Arial, sans-serif;
    }
    table {
      border-spacing: 0;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }
    img {
      border: 0;
      max-width: 100%;
      height: auto;
    }
    a {
      text-decoration: none;
    }
    /* Container */
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    /* Header */
    .header {
      background-color: #1b2c3f;
      padding: 20px;
      text-align: center;
    }
    .header img {
      width: 120px;
      display: inline-block;
    }
    /* Content */
    .content {
      padding: 30px;
      text-align: left;
    }
    .content h1 {
      color: #1b2c3f;
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 20px;
    }
    .content p {
      color: #333333;
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 20px;
    }
    .content .cta-button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #1b2c3f;
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      text-align: center;
      text-decoration: none;
      transition: background-color 0.3s;
    }
    .content .cta-button:hover {
      background-color: #2a4060;
    }
    /* Footer */
    .footer {
      background-color: #f9f9f9;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #666666;
      border-top: 1px solid #e0e0e0;
    }
    .footer p {
      margin: 5px 0;
    }
    .footer a {
      color: #1b2c3f;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .social-links img {
      width: 24px;
      margin: 0 8px;
      vertical-align: middle;
    }
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .container {
        border-radius: 0;
      }
      .content {
        padding: 20px;
      }
      .content h1 {
        font-size: 20px;
      }
      .content p {
        font-size: 14px;
      }
      .content .cta-button {
        width: 100%;
        box-sizing: border-box;
      }
    }
  </style>
</head>
<body>
  <table role="presentation" align="center" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <div class="container">
          <div class="header">
            <img src="https://wind-consulting-tunisia.com/images/windsite/windc_1.png" alt="Beams Logo">
          </div>
          <div class="content">
            <h1>${subject}</h1>
            <p>Dear User,</p>
            <p>${content.message}</p>
            <a href="${content.link}" class="cta-button">Reset Your Password</a>
          </div>
          <div class="footer">
            <p><strong>Beams.wind</strong><br>Empowering Your Future</p>
            <p>© 2024 Beams.wind. All rights reserved.</p>
            <p>
              <a href="https://beams.wind.com">Visit our website</a> | 
              <a href="https://beams.wind.com/contact">Contact Us</a> | 
              <a href="https://beams.wind.com/unsubscribe">Unsubscribe</a>
            </p>
            <p class="social-links">
              <a href="https://facebook.com/beams"><img src="https://img.icons8.com/color/24/facebook-new.png" alt="Facebook"></a>
              <a href="https://twitter.com/beams"><img src="https://img.icons8.com/color/24/twitter--v1.png" alt="Twitter"></a>
              <a href="https://linkedin.com/company/beams"><img src="https://img.icons8.com/color/24/linkedin.png" alt="LinkedIn"></a>
            </p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_MAIL as string,
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_MAIL as string,
        pass: process.env.PASS_MAIL as string,
      },
    });

    const mailOptions = {
      from: `"Beams" <${process.env.USER_MAIL}>`,
      to: destination,
      subject,
      html: mailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email envoyé avec succès : " + info.response);
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi du mail :", error);
    throw new Error(error as string);
  }
}

export { sendMail, MailContent };