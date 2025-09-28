const crypto = require("crypto");

exports.handler = async (event) => {
  console.log("ConfirmBooking input:", event);

  // Generate a unique booking ID using native Node.js
  const bookingId = crypto.randomUUID();

  // Normally you would write to DynamoDB here,
  // but this is enough to pass through for the demo.
  return {
    ...event,
    bookingId,
    bookingStatus: "CONFIRMED"
  };
};
