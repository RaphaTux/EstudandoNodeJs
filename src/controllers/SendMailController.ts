import { resolveNaptr } from "dns";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveysRepository";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UsersRepositories";
import SendmailServices from "../services/SendmailServices";
import {resolve} from "path"

class SendMailController{
  
  
  async execute(request:Request,response:Response){
    const {email,survey_id} = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveyRepository);
    const surveysUsersRepository = getCustomRepository(SurveyUsersRepository);

    // Buscando usuário pelo email 
    // Buscando o Survey via id
    const user = await userRepository.findOne({email})
    const survey = await surveysRepository.findOne({id:survey_id})




    // Checando se os dois existem
    if(!user){
      return response.status(400).json({
        error:"User does not Exists!",
      })
    }

    if(!survey){
      return response.status(400).json({
        error:"Survey does not Exists!",
      })
    }


    

    const vars = {
      name:user.name,
      title:survey.title,
      description:survey.description,
      user_id:user.id,
      link:process.env.URL_MAIL
    }
    const npsPath = resolve(__dirname,"..","views","emails","npsMail.hbs");

    const surveyUserAlredyExists = await surveysUsersRepository.findOne({
      where:[{user_id:user.id},{value:null}],
      relations:["user","survey"],
    })

    if(surveyUserAlredyExists){
      await SendmailServices.execute(email,survey.title,vars,npsPath)
      return response.json(surveyUserAlredyExists)
    }


    // Salvando as informaçoes na tabela SurveyUsers
    const surveyUser = surveysUsersRepository.create({
      user_id:user.id,
      survey_id:survey.id
    })
    await surveysUsersRepository.save(surveyUser);

    // Enviando email para o usuario
    await SendmailServices.execute(email,survey.title, vars,npsPath)

    return response.status(201).json(surveyUser);
  }


  async surveyList(request:Request,response:Response){

    const surveyRepository = getCustomRepository(SurveyUsersRepository);

    const list = await surveyRepository.find();
    
    return response.json(list)
  }

}

export {SendMailController}