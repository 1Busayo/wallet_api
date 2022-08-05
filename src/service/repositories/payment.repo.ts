import { Injectable, HttpException, HttpStatus, Next } from '@nestjs/common';
import { Payments } from '../dto/Payment';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WalletRepo } from './wallet.repo';
import { refcode } from 'src/constants';


@Injectable()
export class PaymentsRepo {

  constructor(@InjectModel('Payments') private paymentModel: Model<Payments>, private wallet: WalletRepo) {

  }


  async payCreate(pays: Partial<Payments>) {

    pays.status = "initiated";
    pays.ref = refcode();






    const newPay = new this.paymentModel(pays);



    const credit = this.wallet.credit(pays.wallet_to_credit, pays.amount, pays.currency)


    const debit = this.wallet.debit(pays.wallet_to_debit, pays.amount, pays.currency)



    const payx = await newPay.save();




    return {
      "status": payx.status,
      "message": "Payment(s) successfully initiated, verify to continue",
      "data": {
        "payment": {
          "id": payx._id, //ID of Payment
          "amount": payx.amount,
          "created_at": payx.created_at,
          "credit_wallet": payx.created_at,
          "currency": payx.currency,
          "debit_wallet": payx.wallet_to_debit,
          "metadata": { "owner": payx.owner },
          "owner": payx.owner, //user id of initiater 
          "ref": payx.ref, // random reference string
          "status": payx.status

        }
      }
    }

  }

  async findAll(): Promise<Payments[]> {
    return this.paymentModel.find();
  }


  async WalletUpd(amount) {


    const wp = await new this.paymentModel({ amount: amount }).save();

    console.log(wp._id.toString())
    return wp._id.toString();
  }


  async findPayment(payid: string): Promise<Payments> {

    return this.paymentModel.findOne({ _id: payid });
  }



  async verifyPayments(payid) {

    const pyid = await this.paymentModel.findOne({ _id: payid });

    if (!pyid) {
      return false
    }



    const vry = await this.paymentModel.findOneAndUpdate(
      { '_id': payid },
      { status: "success" },
      { returnNewDocument: true }
    );


    return {
      "status": "success",
      "message": "Payment successully fetched",
      "data": {
        "payment": {
          "id": vry._id, //ID of Payment
          "amount": vry.amount,
          "created_at": vry.created_at,
          "status": "success",
        }
      }
    }


  }


} 