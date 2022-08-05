import {Injectable,HttpException,HttpStatus} from '@nestjs/common';
import {Users} from '../dto/Users';

import { Model } from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';


@Injectable()
export class UsersRepo {

    constructor (@InjectModel('Users')  private usersModel: Model<Users> ) {

    }


    async UserCreate(users: Partial<Users>) : Promise<Users>{
     const newUsers = new this.usersModel(users);
         const email =users.email;
        const existing = await this.usersModel.findOne({email});

        if (existing) {
          throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

   

        await newUsers.save();

        return newUsers.toObject({versionKey:false});

    }
    
    async findAll(): Promise<Users[]> {
      return this.usersModel.find();
  }


    async WalletUpd(owner,id){
  await this.usersModel.findOneAndUpdate(
    {_id: owner},
    {wallet: id},
    {new:true});
}

async findUser(userid:string): Promise<Users> {

  return this.usersModel.findOne({_id:userid});
}


} 