import dotenv from "dotenv";

dotenv.config();

export default {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.TYPEORM_PASSWORD,
  database: "product_feedback_app",
  entities: ["./src/entity/*.ts"],
  // logging: true,
  synchronize: true,
};
