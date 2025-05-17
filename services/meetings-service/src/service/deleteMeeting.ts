import { IMeeting } from "../interface/IMeeting";
import { Meeting } from "../models/Meeting";
import { sendEmail } from "../utils/sendEmail";
import moment from "moment";
import axios from "axios";

export const deleteMeeting = async (doneBy: string, meetingID: string) => {
  try {
    const meeting = await Meeting.findByPk(meetingID);

    if (!meeting) {
      console.error(`Meeting not found for ID: ${meetingID}`);
      throw new Error("Meeting not found");
    }

    // Normalize participants
    let participants: { username: string; email: string }[] = [];
    if (meeting.participants) {
      try {
        participants = Array.isArray(meeting.participants)
          ? meeting.participants
          : typeof meeting.participants === "string"
          ? JSON.parse(meeting.participants)
          : [];
        if (!Array.isArray(participants)) {
          console.warn(`Parsed participants is not an array:`, participants);
          participants = [];
        }
      } catch (parseError) {
        console.error(`Error parsing participants:`, meeting.participants, parseError);
        participants = [];
      }
    }
    console.log(`Participants to notify:`, participants);

    // Format meeting times for email
    const formattedStartTime = moment(meeting.startTime).format("MMMM Do YYYY, h:mm A");
    const formattedEndTime = moment(meeting.endTime).format("MMMM Do YYYY, h:mm A");

    // Send cancellation email to participants
    for (const participant of participants) {
      if (participant.email) {
        console.log(`Generating cancellation email for participant: ${participant.username} (${participant.email})`);

        const subject = `Meeting Cancelled: ${meeting.title}`;
        const emailContent = `
          <h2>Meeting Cancelled: ${meeting.title}</h2>
          <p>Dear ${participant.username},</p>
          <p>We regret to inform you that the following meeting has been cancelled:</p>
          <ul>
            <li><strong>Title:</strong> ${meeting.title}</li>
            <li><strong>Original Start Time:</strong> ${formattedStartTime}</li>
            <li><strong>Original End Time:</strong> ${formattedEndTime}</li>
            <li><strong>Organizer:</strong> ${meeting.organizer}</li>
          </ul>
          <p>No further action is required. Contact the organizer for more details.</p>
          <p>Best regards,<br/>Meeting Scheduler Team</p>
        `;

        try {
          await sendEmail({
            to: participant.email,
            subject,
            html: emailContent,
          });
          console.log(`Cancellation email sent to ${participant.email} for meeting: ${meeting.title}`);
        } catch (emailError) {
          console.error(`Failed to send cancellation email to ${participant.email}:`, emailError);
          // Continue with other participants
        }
      } else {
        console.warn(`Skipping participant without email: ${participant.username}`);
      }

    }

    // Handle waiting position notification
    if (meeting.waitingPosition) {
      console.log(`Processing waiting position for user ID: ${meeting.waitingPosition}`);

      try {
        const nextUserId = meeting.waitingPosition + 1; 
        console.log(`Fetching user with ID: ${nextUserId}`);
        const response = await axios.get(`http://localhost:3001/api/auth/users/${nextUserId}`);
        const waitingUser = response.data;

        if (waitingUser && waitingUser.email) {
          console.log(`Generating waiting position email for user: ${waitingUser.username} (${waitingUser.email})`);

          const subject = `Meeting Slot Available: ${meeting.title}`;
          const emailContent = `
            <h2>Meeting Slot Available: ${meeting.title}</h2>
            <p>Dear ${waitingUser.username},</p>
            <p>The following meeting has been cancelled, and you were on the waiting list:</p>
            <ul>
              <li><strong>Title:</strong> ${meeting.title}</li>
              <li><strong>Original Start Time:</strong> ${formattedStartTime}</li>
              <li><strong>Original End Time:</strong> ${formattedEndTime}</li>
              <li><strong>Organizer:</strong> ${meeting.organizer}</li>
            </ul>
            <p>This time slot is now available. Please contact the organizer to schedule a new meeting if needed.</p>
            <p>Best regards,<br/>Meeting Scheduler Team</p>
          `;

          try {
            await sendEmail({
              to: waitingUser.email,
              subject,
              html: emailContent,
            });
            console.log(`Waiting position email sent to ${waitingUser.email} for meeting: ${meeting.title}`);
          } catch (emailError) {
            console.error(`Failed to send waiting position email to ${waitingUser.email}:`, emailError);
          }
        } else {
          console.warn(`No valid user data returned for waiting position ID: ${nextUserId}`);
        }
      } catch (apiError) {
        console.error(`Error fetching user from authentication-service for waiting position ID: `, apiError);
        // Continue with deletion even if user fetch fails
      }
    } else {
      console.log(`No waiting position user to notify for meeting ID: ${meetingID}`);
    }

    // Delete the meeting
    await meeting.destroy();
    console.log(`Meeting deleted successfully with ID: ${meetingID}`);

    return { message: "Meeting Deleted Successfully" };
  } catch (error) {
    console.error("Error Deleting Meeting:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error Deleting Meeting"
    );
  }
};