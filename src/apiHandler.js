const { SFNClient, StartExecutionCommand } = require("@aws-sdk/client-sfn");

const client = new SFNClient();

exports.handler = async (event) => {
  console.log("API Request:", JSON.stringify(event));

  const body = JSON.parse(event.body);

  const params = {
    stateMachineArn: process.env.STATE_MACHINE_ARN,
    input: JSON.stringify(body)
  };

  try {
    const command = new StartExecutionCommand(params);
    const response = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Booking request received",
        executionArn: response.executionArn
      })
    };
  } catch (err) {
    console.error("Error starting Step Function:", err);
    return { statusCode: 500, body: "Failed to start booking workflow" };
  }
};
