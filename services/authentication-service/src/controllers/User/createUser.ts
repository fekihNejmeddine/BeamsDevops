import { Request, Response } from "express";
import { createUser } from "../../service/User/createUser";

const createUserHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData = req.body;
    console.log(userData)
    await createUser(userData);
    res.status(200).json({ message: "User created successfully", userData });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
};
export { createUserHandler };
