export const lambdaHandler = async (event, context) => {
  if (!event.queryStringParameters?.foo) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid parameters",
      }),
    };
  }
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world432423423",
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
