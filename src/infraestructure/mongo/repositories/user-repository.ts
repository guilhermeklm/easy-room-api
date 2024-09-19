import { User } from "src/domains/user";
import { UserSchema } from "../schemas/user-schema";

export class UserRepository {
  public async findByEmail(email: string) {
    return await UserSchema.findOne({
      email: email,
    });
  }

  public async save(user: User) {
    const newUser = new UserSchema({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    await newUser.save();
  }
}
