import ShurjoPay from "shurjopay"
import { config } from "../../config"

const shurjoPay = new ShurjoPay()
//shurjoPay.makePa
shurjoPay.config(
    config.sp_endpoint,
    config.sp_username,
    config.sp_password,
    config.sp_prefix,
    config.sp_return_url
)
console.log(shurjoPay)