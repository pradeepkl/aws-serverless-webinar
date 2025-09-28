const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient();

exports.handler = async (event) => {
  console.log("ReserveSeat input:", event);

  const params = {
    TableName: process.env.FLIGHTS_TABLE,
    Key: { flightId: { S: event.flightId } },
    UpdateExpression: "SET availableSeats = availableSeats - :dec",
    ConditionExpression: "availableSeats > :zero",
    ExpressionAttributeValues: {
      ":dec": { N: "1" },
      ":zero": { N: "0" }
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const result = await client.send(new UpdateItemCommand(params));
    console.log("Reservation updated:", result);

    return { ...event, status: "RESERVED" };
  } catch (err) {
    console.error("Reserve seat failed:", err);
    throw err;
  }
};
