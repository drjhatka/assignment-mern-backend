import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join('./' + '.env') })
export const  config = {
    database_url : process.env.DB_URL,
    default_password : process.env.DEFAULT_PASSWORD,
    port:process.env.DB_PORT,
    jwt_secret :process.env.JWT_SECRET,
    jwt_refresh:process.env.JWT_REFRESH_SECRET,
    sp_endpoint:process.env.SP_ENDPOINT,
    sp_username:process.env.SP_USERNAME,
    sp_password:process.env.SP_PASSWORD,
    sp_prefix:process.env.SP_PREFIX,
    sp_return_url:process.env.SP_RETURN_URL,
    //sp_db_file:process.env.DB_FILE
}