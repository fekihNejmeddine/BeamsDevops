import { Request, Response } from "express";
import * as userService from "../../service/User/fetchUsers";

// Fonction pour récupérer tous les utilisateurs
const fetchUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const limit = parseInt(req.query.limit as string) || pageSize;
    const offset = (page - 1) * pageSize;
    const search = req.query.search as string | undefined;
    const role = req.query.role as string | undefined;

    const { count, rows } = await userService.fetchUsers({
      limit,
      offset,
      search,
      role,
      order: [["username", "ASC"]],
    });

    res.status(200).json({
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
      users: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Fonction pour récupérer un utilisateur par ID
const fetchUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.fetchUser(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Fonction pour récupérer un utilisateur par email
const fetchUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.fetchUserByEmail(req.params.email);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

const fetchUserByRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const role = req.params.role;
    const users = await userService.fetchUserByRole(role);
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ message: "Error fetching users by role" });
  }
};
const fetchAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({ message: "Error fetching users by role" });
  }
};
export {
  fetchUsers,
  fetchUser,
  fetchUserByEmail,
  fetchUserByRole,
  fetchAllUsers,
};
