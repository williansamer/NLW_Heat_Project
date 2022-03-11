import "dotenv/config"
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type IPayLoad = {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

  const header = request.headers.authorization;

  if(!header){
    return response.status(401).json({
      error: "Token does not exist"
    })
  }

  const [, token] = header.split(" ")
  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET) as IPayLoad

    request.user_id = sub;
    next();

  } catch (error) {
    return response.status(401).json({
      error: "Token invalid"
    })
  }
}