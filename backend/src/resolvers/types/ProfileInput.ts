import { Field, InputType } from "type-graphql";

@InputType()
export class ProfileInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  pronouns?: string;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  timezone?: string;

  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  socialProfile1?: string;

  @Field({ nullable: true })
  socialProfile2?: string;

  @Field({ nullable: true })
  socialProfile3?: string;

  @Field({ nullable: true })
  socialProfile4?: string;

  @Field({ nullable: true })
  socialProfile5?: string;
}
