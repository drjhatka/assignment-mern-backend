import express, { Application } from "express";
import { configureServer } from "./app/server/server.config";
import router from "./app/routes/router";
import { GlobalErrorHandler } from "./app/error/globalErrorHandler";
import { NotFoundRoute } from "./app/middleware/notFoundRoute";
import cookieParser from "cookie-parser";

const app:Application = express();       //create express app

configureServer(app);   
app.use(cookieParser())                 //configure express app

app.use('/api', router);              //use the router array

app.use(GlobalErrorHandler)

app.use(NotFoundRoute)
export default app;