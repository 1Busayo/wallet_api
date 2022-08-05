import { Controller, Post,Body, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Users } from "src/service/dto/Users";
import * as jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../constants';

import * as bcrypt from 'bcrypt';


@Controller()
export class AuthController {

constructor(@InjectModel("Users") private usersModel: Model<Users>){

}

    @Post("/login")
  async  login( @Body("email") email:string,
           @Body("password") pwd:string){
  
    const user = await this.usersModel.findOne({email});

    if(!user){
        console.log("User does not exist");
        throw new UnauthorizedException("User does not exist");
    }
   

    
    return new Promise((resolve, reject) => {


        bcrypt.compare(pwd, user.password, (err, verified) => {
                if (!verified) {
                    reject(new UnauthorizedException("Invalid Password"));
                }

                const authJwtToken =
                    jwt.sign({email, id: user._id},
                        JWT_SECRET);

                resolve({authJwtToken});
            }
        );
    });




    }

}