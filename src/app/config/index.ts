import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join('./' + '.env') })
export const  config = {
    database_url : process.env.DB_URL,
    default_password : process.env.DEFAULT_PASSWORD,
    port:process.env.DB_PORT,
    jwt_secret :process.env.JWT_SECRET,
    jwt_refresh:process.env.JWT_REFRESH_SECRET
}