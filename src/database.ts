import "reflect-metadata";
import { DataSource } from "typeorm";
import { Country } from "./CountryEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  entities: [Country],
});

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
