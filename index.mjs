import pkg from "pg";
const { Client } = pkg;
const connectionString = "";

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
    const client = new Client(connectionString);
    await client.connect();
    var result = await client.query("select * from testtable t");
    result.rows.forEach((x) => {
      console.log(x);
    });
    //console.log(result);
    await client.end();
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
