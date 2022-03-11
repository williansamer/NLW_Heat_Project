import { Request, Response } from "express";
import { Get3LastMessageService } from "../services/Get3LastMessageService";

export class Get3LastMessageController{
  async handle(request: Request, response: Response){

    const service = new Get3LastMessageService();
    const result = await service.execute()

    return response.json(result)
  }
}