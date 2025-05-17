import { Request, Response } from "express";
import { changePassword as passwordService } from "../../service/Auth/changePassword";

// Define the interface for the request body
interface ChangePasswordRequest {
  Password: string;
  id: string;
}

const changePassword = async (
  req: Request<{}, {}, ChangePasswordRequest>,
  res: Response
): Promise<void> => {
  try {
    const { Password, id } = req.body; // Extract Password and id from the request body
    const saving = await passwordService(Password, id); // Call the password service to change the password

    res.json(saving); // Return the result of the password change
  } catch (error) {
    res
      .status(401)
      .json({
        message: error instanceof Error ? error.message : "Unknown error",
      });
  }
};

export { changePassword };
