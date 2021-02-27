 import { Request,Response} from "express";
import { getRepository } from "typeorm";
import { User} from "../models/User";
 



 class UserController {

  async create(request:Request,response:Response){
    const {name,email} = request.body;

    const usersRepository = getRepository(User);

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
    return response.json(newUser);
  }
 }

 export { UserController}