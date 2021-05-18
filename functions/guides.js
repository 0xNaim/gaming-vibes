exports.handler = async (event, context) => {
  const guides = [
    { title: "Lorem ipsum dolor sit amet.", author: "Naim" },
    { title: "Lorem ipsum dolor sit ametttt.", author: "Onoy" },
    { title: "Lorem ipsum dolor sit ametssss.", author: "Tanvir" },
  ];

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ message: "You must be logged in to see this." }),
  };
};
