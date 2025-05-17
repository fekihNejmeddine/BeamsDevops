import { Meeting } from "../models/Meeting";
import { IMeeting } from "../interface/IMeeting";
import { sendEmail } from "../utils/sendEmail";
import moment from "moment";
import axios from "axios";

export const createMeeting = async (meetData: IMeeting) => {
  try {
    const newMeeting = await Meeting.create({
      title: meetData.title,
      description: meetData.description,
      startTime: meetData.startTime,
      endTime: meetData.endTime,
      location: meetData.location,
      typeMeeting: meetData.typeMeeting,
      organizer: meetData.organizer,
      idMeetingRoom: meetData.idMeetingRoom,
      participants: meetData.participants,
      waitingPosition: meetData.waitingPosition,
      status: meetData.status,
      UserId: meetData.UserId,
    });
    console.log("meetData.participant :",meetData.participants)
    console.log("newMeeting :",newMeeting)
    for (const participant of meetData.participants) {
      console.log(`Sending notification to participant: ${participant.id}`);
      await axios
        .post(
          "http://localhost:3001/api/notifications/",
          {
            user_id: participant.id, // Target participant
            title: "New Meeting",
            detail: `A meeting titled "${newMeeting.title}" was created.`,
            type: participant.id, // Set type to participant's user_id
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .catch((error) => {
          console.error(
            "Error sending notification:",
            error.response?.data || error.message
          );
        });
    }
    const formattedStartTime = moment(meetData.startTime).format(
      "MMMM Do YYYY, h:mm A"
    );
    const formattedEndTime = moment(meetData.endTime).format(
      "MMMM Do YYYY, h:mm A"
    );

    for (const participant of meetData.participants) {
      if (participant.email) {
        console.log(
          `Generating email for participant: ${participant.username} (${participant.email})`
        );

        const emailContent = `
          <h2>Meeting Invitation: ${meetData.title}</h2>
          <p>Dear ${participant.username},</p>
          <p>You have been invited to a meeting scheduled as follows:</p>
          <ul>
            <li><strong>Title:</strong> ${meetData.title}</li>
            <li><strong>Start Time:</strong> ${formattedStartTime}</li>
            <li><strong>End Time:</strong> ${formattedEndTime}</li>
            <li><strong>Location:</strong> ${meetData.location || "TBD"}</li>
            <li><strong>Type:</strong> ${meetData.typeMeeting}</li>
            <li><strong>Organizer:</strong> ${meetData.organizer}</li>
          </ul>
          <p>Please confirm your attendance with the organizer.</p>
          <p>Best regards,<br/>Meeting Scheduler Team</p>
        `;

        await sendEmail({
          to: participant.email,
          subject: `Meeting Invitation: ${meetData.title}`,
          html: emailContent,
        });

        console.log(
          `Email sent to ${participant.email} for meeting: ${meetData.title}`
        );
      } else {
        console.warn(
          `Skipping participant without email: ${participant.username}`
        );
      }
    }
    return newMeeting;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
