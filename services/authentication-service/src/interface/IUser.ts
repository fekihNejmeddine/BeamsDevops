export enum UserRole {
  Admin = "Admin",
  Rh = "Rh",
  Syndic = "Syndic",
  Resident = "Resident",
  Employee = "Employee",
}
export enum Gendre {
  Male = "male",
  Female = "female",
}
export interface IUser {
  id?: number;
  username: string;
  lastName?: string;
  password?: string;
  email: string;
  role?: UserRole;
  Status?: Boolean;
  Gender?: Gendre;
  refreshToken?: string;
  updatedAt?: string;
  createdAt?: number;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  isDeleted?: boolean;

}
