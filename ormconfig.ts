import * as dotenv from "dotenv";

dotenv.config();

export default {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.TYPEORM_PASSWORD,
  database: "poduct_feedback_app",
  loggin: true,
  synchronize: true,
};
