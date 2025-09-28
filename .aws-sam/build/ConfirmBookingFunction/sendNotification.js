const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const client = new SNSClient();

exports.handler = async (event) => {
  console.log("SendNotification input:", event);

  const message = `Booking Confirmed!\nPassenger: ${event.passengerName}\nFlight: ${event.flightId}\nBooking ID: ${event.bookingId}`;

  const params = {
    TopicArn: process.env.BOOKING_TOPIC,
    Message: message,
    Subject: "Airline Booking Confirmation"
  };

  try {
    await client.send(new PublishCommand(params));
    return { ...event, notification: "SENT" };
  } catch (err) {
    console.error("Notification failed:", err);
    throw err;
  }
};
