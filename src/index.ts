import express from "express";
import data from "./data.json";

const PORT = 3001;
const app = express();

app.use(express.json());

app.get("/all", (reqeust, response) => {
  response.send(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
