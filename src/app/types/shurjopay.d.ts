declare module "shurjopay" {
    class ShurjoPay {
        config(root_url:string,
            merchant_username:string,
            merchant_password:string,
            merchant_key_prefix:string,
            return_url:string
        ):void;
    }
    export default ShurjoPay
}