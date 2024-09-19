import { UserRepository } from "../infraestructure/mongo/repositories/user-repository";
import { CreateUserDTO } from "../application/controllers/dtos/create-user-dto";
import { User } from "src/domains/user";

export class CreateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async create(userDTO: CreateUserDTO) {
    const user = new User(userDTO.name, userDTO.email, userDTO.password);
    const isEmailAllReadyExist = await this.userRepository.findByEmail(user.email)
    if(isEmailAllReadyExist) {
      throw new Error("conta existente") 
    }

    await this.userRepository.save(user)
  }
}
