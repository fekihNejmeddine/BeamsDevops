export enum Status {
  Pending = "Pending",
  InProgress = "In Progress",
  Resolved = "Resolved",
}

export interface IReclamation {
  id?: number;
  title: string;
  description: string;
  user_id: number;
  status?: Status;
  Photo?: string[];
  created_at?: number;
}
