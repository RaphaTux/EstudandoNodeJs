import { Entity, EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Surveys";

@EntityRepository(Survey)
class SurveyRepository extends Repository<Survey>{}

export {SurveyRepository}