import "dotenv/config";
import express  from "express";
import { routes } from "./routes";
import http from 'http';
import { Server } from "socket.io";
import cors from "cors";

const app = express();

const serverHttp = http.createServer(app); //Quando rodar o serverHttp, roda também o app

const io = new Server(serverHttp, {cors: { //Criando o server. Colocando o 'cors' p/ que, tanto a web e mobile da parte do front, escutem o servidor
  origin: '*'
}})

//Ouvindo(on) a 'connection'
io.on("connection", socket=>console.log(`Server Connect on socket ${socket.id}`));

app.use(cors())
app.use(express.json());
app.use(routes);

app.get("/github", (request, response)=> {

  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

app.get("/signin/callback", (request, response)=>{
  const { code } = request.query;

  return response.json(code)
})

export {io, serverHttp}