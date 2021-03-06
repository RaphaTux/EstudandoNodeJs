import request from "supertest";
import { app } from "../app";

// db
import creatConnection from "../database"

describe("Surveys", ()=>{
  beforeAll(async ()=>{
    const connection = await creatConnection();
    await connection.runMigrations();
  });

  it("Should be able to create a new Survey",async ()=>{

    const response =await request(app).post("/surveys").send({
      title:"title Exemple",
      description:"Description Exemple"
    })

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

  }),
  it("Should be able to get all surveys",async ()=>{

    await request(app).post("/surveys").send({
      title:"title Exemple2",
      description:"Description Exemple2"
    })

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2);

  })

  
  




})