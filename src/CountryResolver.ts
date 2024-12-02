import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "./CountryEntity";
import { AppDataSource } from "./database";

@Resolver()
export class CountryResolver {
  private countryRepository = AppDataSource.getRepository(Country);

  @Mutation(() => Country)
  async addCountry(@Arg("code") code: string, @Arg("name") name: string, @Arg("emoji") emoji: string, @Arg("continent") continent: string): Promise<Country> {
    const country = new Country(code, name, emoji, continent);
    return await this.countryRepository.save(country);
  }

  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  @Query(() => Country, { nullable: true })
  async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
    return await this.countryRepository.findOne({ where: { code } });
  }
}
