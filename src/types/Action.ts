export type Action = {
  id: number;
  name: string;
  description: string;
  status: ActionStatus;
  location: string;
  professor: string;
};

export type ActionStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled";
