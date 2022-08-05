import {IsBoolean, IsInt, IsMongoId, IsString,IsEmail, IsNotEmpty} from 'class-validator';
  
  export class Users {

@IsEmail () 
@IsNotEmpty()
email: String;
@IsString()
@IsNotEmpty()
firstName: String;
@IsString()
@IsNotEmpty()
lastName: String;
@IsString()
@IsNotEmpty()
password: String;


  }