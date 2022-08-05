import {IsBoolean, IsInt, IsMongoId, IsString,IsNumber, IsNotEmpty , IsDate} from 'class-validator';
  
  export class Payments { 


 @IsNumber()
   @IsNotEmpty()
   amount: Number;

    created_at:Date;
 
    @IsMongoId()
    @IsNotEmpty()
    wallet_to_credit:String;

   @IsString()
   @IsNotEmpty()
   currency: String;

     @IsMongoId()
    @IsNotEmpty()
    wallet_to_debit:String;

   @IsMongoId()
   @IsNotEmpty()
   owner: String;
  

   @IsString()
   @IsNotEmpty()
   ref: String;

   @IsString()
   @IsNotEmpty()
   status: String;

}


// export class PaymentsFun { 


//     @IsNumber()
//       @IsNotEmpty()
//       amount: Number;
   
//        created_at:Date;
    
//        @IsMongoId()
      
//        credit_wallet:String;
   
//       @IsString()
     
//       currency: String;
   
//         @IsMongoId()
      
//        debit_wallet:String;
   
//       @IsMongoId()
     
//       owner: String;
     
   
//       @IsString()
     
//       ref: String;
   
//       @IsString()
     
//       status: String;
   
//    }
   


