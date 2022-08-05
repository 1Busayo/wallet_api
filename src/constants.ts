export const MONGO_CONNECTION='mongodb+srv://okra_takehome:bHrZclVaxWkjwdM7@okra-takehome.nopar.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

export const JWT_SECRET = "123secret";



export const  refcode = ()=> {
    let length =12;
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return `txn_${result}`;
}
