 import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRepositories";
 



 class UserController {

  async create(request:Request,response:Response){
    const {name,email} = request.body;

    const usersRepository = getCustomRepository(UserRepository);

    // verificando se usuario existe 
    const userAlredyExists = await usersRepository.findOne({
      email 

    })
    
    if(userAlredyExists){

      return response.status(400).json({
        error: "User alredy exists!"

      })

    }
    const newUser = usersRepository.create({
      name,email
    })
    
    await usersRepository.save(newUser)
    return response.status(201).json(newUser);
  }
 }

 export { UserController };
