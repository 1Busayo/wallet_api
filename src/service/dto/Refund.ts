import {IsBoolean, IsInt, IsMongoId, IsString,IsNumber, IsNotEmpty , IsDate} from 'class-validator';
  
  export class Refunds { 


 @IsNumber()
   @IsNotEmpty()
   amount: Number;

    created_at:Date;
 
    @IsMongoId()
    @IsNotEmpty()
    payment: String;

  @IsMongoId()
   @IsNotEmpty()
   owner: String;


   @IsString()
   @IsNotEmpty()
   currency: String;

  
  
   @IsString()
   @IsNotEmpty()
   ref: String;

   @IsString()
   @IsNotEmpty()
   status: String;

}



