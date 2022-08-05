import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Refunds } from '../dto/Refund';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WalletRepo } from './wallet.repo';
import { refcode } from 'src/constants';
import { PaymentsRepo } from './payment.repo';


@Injectable()
export class RefundsRepo {

    constructor(@InjectModel('Refunds') private refundModel: Model<Refunds>, private wallet: WalletRepo, private payment:PaymentsRepo) {

    }


    async refundCreate(refund: Partial<Refunds> , payid) {

        const payme = await this.payment.findPayment(payid);

        if (!payme) {
            throw new HttpException('payment id does not exists', HttpStatus.BAD_REQUEST);
          }


           refund.status="initiated";
           refund.ref= refcode();
                 

           let amt = Number(refund.amount)

        //refunding 95%
     let refamt= Number(amt) - (amt * 0.05)


         refund.amount=refamt;



        const credit = this.wallet.credit( payme.owner,refamt  ,null)

     const newRefund = new this.refundModel(refund);

      const payx =  await newRefund.save();


      

        return {
            "status": payx.status,
              "message": "Refund(s) successfully initiated, verify to continue",
              "data": {
                  "refund": {
                    "id": payx._id, //ID of Payment
                      "amount": payx.amount,
                      "created_at": payx.created_at,
                      "payment": payx.payment,
                      "currency": payx.currency,
                      "owner": payx.owner, //user id of initiater 
                      "ref": payx.ref, // random reference string
                      "status": payx.status
                      
                     }
              }
          }

    }



    async verifyRefunds(refid ) {

        const pyid = await this.refundModel.findOne({_id:refid});
     
         if (!pyid) {
             throw new HttpException('id does not exists', HttpStatus.BAD_REQUEST);
           }
     
     
     
       const vry =  await this.refundModel.findOneAndUpdate(
             { '_id' : refid },
          { status: "success" },
          {returnNewDocument:true}
           );
     
     
       return {
        "status": vry.status,
        "message": "Payment successully fetched",
        "data": {
              "payment": {
                  "id":  vry._id, //ID of Payment
                  "amount": vry.amount,
                  "created_at": vry.created_at,
                  "status": vry.status,
               }
          }
      }
  
  
           }
     

} 