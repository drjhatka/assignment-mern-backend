import { Application } from "express";
import cors from 'cors'
import express from 'express';
import cookieParser from "cookie-parser";


//define server configurations...
const serverConfigurations = {
    cors: cors({origin:"*"}), // for now accept requests from everywhere
    jsonParser: express.json(),
    cookieParser: cookieParser(),
}

export const configureServer = (app:Application)=>{
    for(const [key, value] of Object.entries(serverConfigurations)){
        app.use(value)
    }
}

export const  config = {
    database_url : process.env.DB_URL,
    default_password : process.env.DEFAULT_PASSWORD,

}