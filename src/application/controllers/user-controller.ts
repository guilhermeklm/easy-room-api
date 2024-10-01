import { Request, Response } from "express";
import { CreateUserDTO } from "./dtos/create-user-dto";
import { CreateUser } from "../../usecases/create-user";
import { LoginDTO } from "./dtos/login-dto";
import { UserLogin } from "../../usecases/user-login";
import { Jwt } from "../middleware/jwt";

export class UserController {
  private createUserUseCase: CreateUser;
  private userLogin: UserLogin;

  constructor(
    createUserUseCase: CreateUser,
    userLogin: UserLogin
  ) {
    this.createUserUseCase = createUserUseCase;
    this.userLogin = userLogin;
  }

  public async createUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const userDTO: CreateUserDTO = { name: body.name, email: body.email, password: body.password };
      await this.createUserUseCase.create(userDTO);

      res.status(201).json({
        status: "success",
        messages: [
          "Usuario criado com sucesso!"
        ]
      })

    } catch (error) {
      if (error instanceof Error) {
        res.json(error.message)
      } else {
        res.json(error)
      }
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const body = req.body;
      const dto: LoginDTO = { email: body.email, password: body.password }
      const user = await this.userLogin.login(dto);
      const token = Jwt.generateAuthToken(user.id);

      res.setHeader('Authorization', `Bearer ${token}`);
      res.status(200).json({
        status: "success",
        message: "Login realizado com sucesso!",
        data: {
          name: user.name,
          email: user.email
        }
      });

    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json(error.message)
      } else {
        res.status(401).json(error)
      }
    }
  }
}
