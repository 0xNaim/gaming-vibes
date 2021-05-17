exports.handler = async () => {
  console.log("Function Running...");

  const data = { name: "Naim", age: 20, job: "Front End Developer" };

  // return response to browser
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
