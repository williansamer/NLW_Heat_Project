import "dotenv/config";
import axios from "axios";
import prismaClient from "../database";
import { sign } from "jsonwebtoken";

interface IAcessTokenResponse{
  access_token: string
}

interface IUserResponse{
  id: number,
  login: string,
  avatar_url: string,
  name: string
}

export class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const {data: accessTokenResponse} = await axios.post<IAcessTokenResponse>(url, null , {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    const { id, login, avatar_url, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    })

    if(!user){
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name
        }
      })
    }

    const token = sign({ 
      user: {
        id: user.id,
        avatar_url: user.avatar_url,
        name: user.name
      }
     }, 
     process.env.TOKEN_SECRET,
     {
      subject: user.id,
      expiresIn: "1d"
    })
    

    return { token, user };
  }
}
