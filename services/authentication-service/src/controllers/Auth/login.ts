import { Request, Response } from "express";
import { login as loginService } from "../../service/Auth/login";

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    const { email, password }: { email: string; password: string } = req.body;
    const { token, refresh, user } = await loginService(email, password);

    res.cookie("jwt", refresh, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      secure: isProduction,
      sameSite: "strict",
    });

    res.json({ user, accessToken: token, refreshToken: refresh });
  } catch (error) {
    res
      .status(401)
      .json(error instanceof Error ? error.message : "An error occurred");
  }
};

export { login };
