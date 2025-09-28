const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient();

exports.handler = async (event) => {
  console.log("ConfirmBooking input:", event);

  const bookingId = uuidv4();

  const params = {
    TableName: process.env.BOOKINGS_TABLE,
    Item: {
      bookingId: { S: bookingId },
      passengerName: { S: event.passengerName },
      flightId: { S: event.flightId },
      status: { S: "CONFIRMED" }
    }
  };

  try {
    await client.send(new PutItemCommand(params));
    return { ...event, bookingId, bookingStatus: "CONFIRMED" };
  } catch (err) {
    console.error("Confirm booking failed:", err);
    throw err;
  }
};
