import pkg from "pg";
const { Client } = pkg;
const connectionString = process.env.ConnectionString;

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
    await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: result.rows,
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
