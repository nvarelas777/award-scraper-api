import pkg from "pg";
const { Client } = pkg;
const connectionString = process.env.ConnectionString;
import puppeteer from "puppeteer-core";
import Chromium from "@sparticuz/chromium";

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
    const browser = await puppeteer.launch({
      args: Chromium.args,
      defaultViewport: Chromium.defaultViewport,
      ignoreHTTPSErrors: true,
      headless: false,
      executablePath: await Chromium.executablePath(),
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
    );
    await page.goto("https://google.com");
    const pageTitle = await page.title();
    const content = await page.content();
    console.log(pageTitle);
    // const client = new Client(connectionString);
    // await client.connect();
    // var result = await client.query("select * from testtable t");
    // result.rows.forEach((x) => {
    //   console.log(x);
    // });
    // await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: content,
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
