import { resolveNaptr } from "dns";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveysRepository";

class SurveysController{
  async create(request:Request,response:Response){
    const {title,description} = request.body;

    const surveyRepository = getCustomRepository(SurveyRepository);
    
    const survey = surveyRepository.create({
      title,
      description
    })

    await surveyRepository.save(survey);

    return response.status(201).json(survey);
  }


  async surveyList(request:Request,response:Response){

    const surveyRepository = getCustomRepository(SurveyRepository);

    const list = await surveyRepository.find();
    
    return response.json(list)
  }

}

export {SurveysController}