import { Meeting } from "../models/Meeting";
import { IMeeting } from "../interface/IMeeting";
import { sendEmail } from "../utils/sendEmail";
import moment from "moment";

export const updateMeeting = async (
  meetingData: IMeeting,
  meetingID: string
) => {
  try {
    console.log(`Updating meeting ID: ${meetingID}`);

    const meeting = await Meeting.findByPk(meetingID);
    if (!meeting) {
      console.error(`Meeting not found for ID: ${meetingID}`);
      throw new Error("Meeting not found");
    }

    // Normalize original participants to ensure it's an array
    let originalParticipants: { username: string; email: string }[] = [];
    if (meeting.participants) {
      try {
        originalParticipants = Array.isArray(meeting.participants)
          ? meeting.participants
          : typeof meeting.participants === "string"
          ? JSON.parse(meeting.participants)
          : [];
        if (!Array.isArray(originalParticipants)) {
          console.warn(
            `Parsed originalParticipants is not an array:`,
            originalParticipants
          );
          originalParticipants = [];
        }
      } catch (parseError) {
        console.error(
          `Error parsing originalParticipants:`,
          meeting.participants,
          parseError
        );
        originalParticipants = [];
      }
    }
    console.log(`Normalized original participants:`, originalParticipants);

    // Check for date changes
    const isStartTimeChanged =
      meetingData.startTime &&
      meetingData.startTime !== meeting.startTime;
    const isEndTimeChanged =
      meetingData.endTime && meetingData.endTime !== meeting.endTime;
    const isDateChanged = isStartTimeChanged || isEndTimeChanged;
    console.log(
      `Date change detected - startTime: ${isStartTimeChanged}, endTime: ${isEndTimeChanged}`
    );

    // Check for status change to cancelled
    const isStatusCancelled =
      meetingData.status && meetingData.status === "cancelled" && meeting.status !== "cancelled";
    console.log(`Status change to cancelled: ${isStatusCancelled}`);

    // Update fields if provided
    if (meetingData.title) meeting.title = meetingData.title;
    if (meetingData.description) meeting.description = meetingData.description;
    if (meetingData.startTime) meeting.startTime = meetingData.startTime;
    if (meetingData.endTime) meeting.endTime = meetingData.endTime;
    if (meetingData.organizer) meeting.organizer = meetingData.organizer;
    if (meetingData.typeMeeting) meeting.typeMeeting = meetingData.typeMeeting;
    if (meetingData.location) meeting.location = meetingData.location;
    if (meetingData.participants)
      meeting.participants = meetingData.participants;
    if (meetingData.status) meeting.status = meetingData.status;
    if (meetingData.waitingPosition)
      meeting.waitingPosition = meetingData.waitingPosition;

    // Normalize updated participants
    const updatedParticipants = meetingData.participants || originalParticipants;
    console.log(`Updated participants:`, updatedParticipants);

    // Identify new participants (for completeness, though not used here)
    const newParticipants = updatedParticipants.filter(
      (newP) =>
        !originalParticipants.some(
          (oldP) => oldP.email === newP.email
        )
    );
    console.log(`New participants to notify:`, newParticipants);

    await meeting.save();
    console.log(`Meeting updated successfully with ID: ${meetingID}`);

    // Send emails based on status or date changes
    const participantsToNotify = updatedParticipants;
    console.log(`Participants to notify:`, participantsToNotify);

    if (participantsToNotify.length > 0) {
      const formattedStartTime = moment(meeting.startTime).format(
        "MMMM Do YYYY, h:mm A"
      );
      const formattedEndTime = moment(meeting.endTime).format(
        "MMMM Do YYYY, h:mm A"
      );

      for (const participant of participantsToNotify) {
        if (participant.email) {
          console.log(
            `Generating email for participant: ${participant.username} (${participant.email})`
          );

          let emailContent: string;
          let subject: string;

          if (isStatusCancelled) {
            // Cancellation email
            subject = `Meeting Cancelled: ${meeting.title}`;
            emailContent = `
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
          } else if (isDateChanged) {
            // Date change email
            subject = `Meeting Updated: ${meeting.title}`;
            emailContent = `
              <h2>Meeting Updated: ${meeting.title}</h2>
              <p>Dear ${participant.username},</p>
              <p>The following meeting has been updated with new dates:</p>
              <ul>
                <li><strong>Title:</strong> ${meeting.title}</li>
                <li><strong>New Start Time:</strong> ${formattedStartTime}</li>
                <li><strong>New End Time:</strong> ${formattedEndTime}</li>
                <li><strong>Location:</strong> ${meeting.location || "TBD"}</li>
                <li><strong>Type:</strong> ${meeting.typeMeeting}</li>
                <li><strong>Organizer:</strong> ${meeting.organizer}</li>
              </ul>
              <p>Please confirm your availability with the organizer.</p>
              <p>Best regards,<br/>Meeting Scheduler Team</p>
            `;
          } else {
            // No email needed for other changes
            console.log(
              `No email sent to ${participant.email}: No date or status change`
            );
            continue;
          }

          try {
            await sendEmail({
              to: participant.email,
              subject,
              html: emailContent,
            });
            console.log(
              `Email sent to ${participant.email} for meeting: ${meeting.title} (${subject})`
            );
          } catch (emailError) {
            console.error(
              `Failed to send email to ${participant.email}:`,
              emailError
            );
            // Continue with other participants
          }
        } else {
          console.warn(
            `Skipping participant without email: ${participant.username}`
          );
        }
      }
    } else {
      console.log(`No participants to notify.`);
    }

    return meeting.toJSON();
  } catch (error) {
    console.error("Error updating meeting:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error updating meeting"
    );
  }
};