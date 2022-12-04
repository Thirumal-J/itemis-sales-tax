/**
 * This is only for SERVER Activation, so that it won't affect the test cases
 */
import app from "./app";

const checkMsg = `Server up and running at http://localhost:${process.env.SERVER_PORT}`;

app.listen(process.env.SERVER_PORT, () => {
  console.log(checkMsg);
});
