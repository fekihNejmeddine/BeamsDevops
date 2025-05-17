import { Request, Response } from "express";
import { refreshToken as refreshTokenService } from "../../service/Auth/refreshToken";
import { User } from "../../models/User"; // Import your Sequelize User model

// Interface for the token response
interface TokenResponse {
  token: string;
  user: {
    id: number | string;
    email: string;
    // Add other safe user properties you want to expose
    [key: string]: any;
  };
}

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const cookies = req.cookies;

    // Call the refresh token service
    const { token, foundUser } = await refreshTokenService(cookies);

    const response: TokenResponse = {
      token,
      user: foundUser,
    };

    res.status(200).json(response);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "UNKNOWN_ERROR";

    switch (errorMessage) {
      case "REFRESH_TOKEN_MISSING":
        res.status(400).json({
          message: "Refresh token missing",
          action: "Please login again",
        });
      case "USER_NOT_FOUND":
        res.status(404).json({
          message: "User session expired",
          action: "Please login again",
        });
      case "REFRESH_TOKEN_EXPIRED":
        res.status(401).json({
          message: "Session expired",
          action: "Please login again",
        });
      case "INVALID_REFRESH_TOKEN":
        res.status(403).json({
          message: "Invalid session",
          action: "Please login again",
        });
      default:
        console.error("Unknown error during token refresh:", error);
        res.status(500).json({
          message: "Internal server error",
          action: "Please try again later",
        });
    }
  }
};
export { refreshToken };
