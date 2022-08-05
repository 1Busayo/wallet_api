import {IsBoolean, IsInt, IsMongoId, IsString,IsEmail, IsNotEmpty, IsNumber} from 'class-validator';
  
export  class Wallets {
    @IsMongoId()
    @IsNotEmpty()
    owner: String;
    @IsNumber()
    @IsNotEmpty()
    amount: Number;
    @IsString()
    @IsNotEmpty()
    currency: String;
    @IsNumber()
    @IsNotEmpty()
    dailyLimit : Number;


}

export class FundWallet {
    @IsMongoId()
    @IsNotEmpty()
    wallet: String;
  
    @IsNotEmpty()
     amount: number;
  
 
  }