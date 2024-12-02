import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id?: number;

  @Field()
  @Column({ unique: true })
  code: string;

  @Field()
  @Column({ length: 50 })
  name: string;

  @Field()
  @Column()
  emoji: string;

  @Field()
  @Column({ length: 50 })
  continent: string;

  constructor(code: string, name: string, emoji: string, continent: string) {
    this.code = code;
    this.name = name;
    this.emoji = emoji;
    this.continent = continent;
  }
}
