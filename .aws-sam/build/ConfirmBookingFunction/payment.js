exports.handler = async (event) => {
  console.log("Payment input:", event);

  // Simulate random success/failure (demo only)
  const success = true; // or Math.random() > 0.2;

  if (success) {
    return { ...event, paymentStatus: "SUCCESS" };
  } else {
    throw new Error("Payment failed");
  }
};
