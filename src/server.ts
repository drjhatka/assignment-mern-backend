import { Server } from 'http'
import { catchAsync } from './app/utils/catchAsync';
import { connect } from 'mongoose';
import { config } from './app/config';
import app from './app';

let server: Server;

//define connect function to mongodb server
const connectToDB = async () => {
    try {
        await connect(config.database_url as string).then(() => { console.log('Connected to Database') })
        server = app.listen(config.port, () => {
            console.log('Server is on all ears')
        })
    } catch (err) {
        console.log("Database Error!", err)
    }

}

connectToDB()