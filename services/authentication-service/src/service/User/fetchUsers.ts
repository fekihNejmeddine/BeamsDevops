import { User } from "../../models/User";
import { Op } from "sequelize";

interface FetchOptions {
  limit?: number;
  offset?: number;
  search?: string;
  role?: string;
  order?: [string, string][];
}

// Fetch all users
const fetchUsers = async (options: FetchOptions) => {
  try {
    const { limit, offset, search, role, order } = options;
    const where: any = {
      role: { [Op.not]: "Admin" },
      isDeleted: false,
    };

    // Apply search filter (username, lastName, or email)
    if (search) {
      where[Op.or] = [
        { username: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    // Apply role filter
    if (role) {
      where.role = { [Op.eq]: role };
    }

    const users = await User.findAndCountAll({
      where,
      limit,
      offset,
      order,
    });

    return users;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};

// Fetch user by ID
const fetchUser = async (userID: string) => {
  try {
    const user = await User.findByPk(userID);
    return user;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};

// Fetch user by email
const fetchUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};

// Fetch users by role
const fetchUserByRole = async (role: string) => {
  try {
    const users = await User.findAll({ where: { role } });
    return users;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};
// Fetch All users
const fetchAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};
export {
  fetchAllUsers,
  fetchUsers,
  fetchUser,
  fetchUserByEmail,
  fetchUserByRole,
};
