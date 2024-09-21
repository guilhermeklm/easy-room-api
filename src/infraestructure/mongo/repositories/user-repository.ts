import { User } from "../../../domains/user";
import { UserSchema } from "../schemas/user-schema";

export class UserRepository {
  public async findByEmail(email: string): Promise<User | null> {
    const user = await UserSchema.findOne({
      email: email,
    });

    if(user) {
      return new User(user.id, user.name, user.email, user.password)
    }

    return null
  }

  public async findByEmailWithPassword(email: string): Promise<User | null> {
    const user = await UserSchema.findOne({
      email: email
    }).select("+password");

    if(user) {
      return new User(user.id, user.name, user.email, user.password)
    }

    return null
  }

  public async checkUserExists(email: string): Promise<boolean> {
    const count = await UserSchema.countDocuments({email: email})

    if(count > 0){
      return Promise.resolve(true)
    } 
    return Promise.resolve(false)
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
