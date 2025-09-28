const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

exports.handler = async (event) => {
  console.log("CheckAvailability input:", event);

  const flightId = event.flightId;

  const params = {
    TableName: process.env.FLIGHTS_TABLE,
    Key: { flightId: { S: flightId } }
  };

  try {
    const data = await client.send(new GetItemCommand(params));
    const availableSeats = parseInt(data.Item?.availableSeats?.N || "0");

    if (availableSeats > 0) {
      return { ...event, availableSeats, status: "AVAILABLE" };
    } else {
      throw new Error("No seats available");
    }
  } catch (err) {
    console.error("Availability check failed:", err);
    throw err;
  }
};
