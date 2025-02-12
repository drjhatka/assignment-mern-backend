import ShurjoPay from "shurjopay"
import { config } from "../../config"
import { sendResponse } from "../../utils/sendResponse"
import { Response } from "express"
import status from "statuses"
import { resolve } from "path"

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

const makePayment = async(paymentPayload:any)=>{
    return new Promise((resolve, reject)=>{
        shurjoPay.makePayment(paymentPayload, (response)=>{resolve(response)}, (error)=>{reject(error)})
    })
}

export const orderUtils ={
    makePayment,
}