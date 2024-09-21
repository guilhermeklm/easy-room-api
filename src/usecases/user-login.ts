import { UserRepository } from "../infraestructure/mongo/repositories/user-repository";
import { LoginDTO } from "../application/controllers/dtos/login-dto";
import bcrypt from "bcrypt"

export class UserLogin {

  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async login(loginDTO: LoginDTO) {
    const user = await this.userRepository.findByEmailWithPassword(loginDTO.email)
    if (!user) {
      throw new Error("Email ou senha incorretos")
    }

    const isPasswordValid = await bcrypt.compare(
      loginDTO.password,
      user.password
    );

    if(!isPasswordValid) {
      throw new Error("Senha invalida")
    }

    return Promise.resolve(user)
  }
}