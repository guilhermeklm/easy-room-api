import { Request, Response } from "express";
import { CreateUserDTO } from "./dtos/create-user-dto";
import { CreateUser } from "../../usecases/create-user";

export class UserController {
  private createUserUseCase: CreateUser;

  constructor(createUserUseCase: CreateUser) {
    this.createUserUseCase = createUserUseCase;
  }

  public async createUser(req: Request, res: Response) {
    try {
      const user = req.body;
      const userDTO = new CreateUserDTO(user.name, user.email, user.passowrd);
      await this.createUserUseCase.create(userDTO);
    } catch (error) {
      console.log(error);
    }
  }
}
