import prismaClient from "../database";

export class Get3LastMessageService{
  async execute(){
    const message = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true
      }
    })

    return message
  }
}