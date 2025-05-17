export interface IMeeting {
  id?: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  organizer: string;
  typeMeeting: TypeMeeting;
  location?: string;
  idMeetingRoom?: number;
  participants: { id: number; username: string; email: string }[];
  // isVirtual: boolean;
  // meetingUrl?: string;
  UserId: number;
  waitingPosition?: number;
  status?: status;
}
export enum TypeMeeting {
  TeamMeeting = "team meet",
  ClientMeeting = "Client Meeting",
  ProjectMeeting = "Project Meeting",
}
export enum status {
  Scheduled = "scheduled",
  InProgress = "in-progress",
  Completed = "completed",
  Cancelled = "cancelled",
}
