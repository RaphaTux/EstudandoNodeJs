import express, { request, response } from "express";

const app = express();


// Rotas


app.get("/",(request,response)=>{

  return response.json({message:"ping"})


})


app.get("/users",(request,response)=>{
  return response.json({message:"hello world"})
})


app.post("/",(request,response)=>{
  return response.json({message:"os dados foram salvos com sucesso!"});
})








app.listen(3333,()=> console.log("server is running "))

