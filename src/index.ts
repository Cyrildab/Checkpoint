import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./CountryResolver";
import { connectDatabase, AppDataSource } from "./database";
import { Country } from "./CountryEntity";

const populateDatabase = async () => {
  const countryRepository = AppDataSource.getRepository(Country);

  const existingCountries = await countryRepository.find();
  if (existingCountries.length > 0) {
    console.log("Database already populated.");
    return;
  }

  const countries = [
    new Country("FR", "France", "🇫🇷", "Europe"),
    new Country("US", "United States", "🇺🇸", "America"),
    new Country("JP", "Japan", "🇯🇵", "Asia"),
  ];

  await countryRepository.save(countries);
  console.log("Database populated with initial countries.");
};

const startServer = async () => {
  await connectDatabase(); 
  await populateDatabase(); 

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at ${url}`);
};

startServer();
