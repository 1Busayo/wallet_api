import {Injectable,HttpException,HttpStatus,Res} from '@nestjs/common';
import {FundWallet, Wallets} from '../dto/Wallet';
import {UsersRepo} from '../repositories/users.repo';
import { Model } from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Response } from 'express';


@Injectable()
export class WalletRepo {

    constructor (@InjectModel('Wallets')  private walletModel: Model<Wallets> , private usersDB: UsersRepo ) {

    }
   
    async WalletCreate(wallet: Partial<Wallets> , usrid): Promise<Wallets> {

         wallet.owner= usrid ;

         const owner =wallet.owner;

        const existing = await this.walletModel.findOne({owner});

        if (existing) {
          throw new HttpException('Users wallet already exists', HttpStatus.BAD_REQUEST);
        }

       

        const newWallet = new this.walletModel(wallet);

   
        await newWallet.save();

        await  this.usersDB.WalletUpd(owner,newWallet._id)
        return newWallet.toObject({versionKey:false});

    }


    async findAll(): Promise<Wallets[]> {

        return this.walletModel.find();
    }

    async findWallet(id:string): Promise<Wallets> {

        return this.walletModel.findOne({_id:id});
      }



    async fundWallet(fundwallet:FundWallet ) {

   const wallet = this.walletModel.findOne({_id:fundwallet.wallet});

    if (!wallet) {
        throw new HttpException('Wallets does not exists', HttpStatus.BAD_REQUEST);
      }



  const funded =  await this.walletModel.updateOne(
        { '_id' : fundwallet.wallet },
        { $inc: { amount: fundwallet.amount } });


      }




      async credit(creditwallet , amt , currency ) {

        const wallet = this.walletModel.findOne({_id:creditwallet});
     
         if (!wallet) {
             throw new HttpException('Wallets does not exists', HttpStatus.BAD_REQUEST);
           }
     
     
     
       const funded =  await this.walletModel.updateOne(
             { '_id' : creditwallet  },
             { $inc: { 'amount': amt } } , {'currency' : currency});
     
     
           }
     

      async debit(debitwallet , amt , currency ) {

        const wallet = this.walletModel.findOne({_id:debitwallet});
     
         if (!wallet) {
             throw new HttpException('Wallets does not exists', HttpStatus.BAD_REQUEST);
           }
     
     
     
       const funded =  await this.walletModel.updateOne(
             { '_id' : debitwallet  },
             { $inc: { 'amount': -amt } } , {'currency' : currency});
     
     
           }
     
     

} 