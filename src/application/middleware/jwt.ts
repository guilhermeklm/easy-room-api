import * as jwt from 'jsonwebtoken';

export class Jwt {
  public static generateAuthToken(userId: string | null) {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    if(!userId) {
      throw new Error("Nao foi possivel criar token pois o userId é nulo")
    }

    const payload = { userId: userId };

    return jwt.sign(payload, jwtSecret, { expiresIn: '30m' });
  }
}