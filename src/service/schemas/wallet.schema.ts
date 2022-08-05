import * as mongoose from 'mongoose';



export const WalletSchema = new mongoose.Schema({

    owner: {
        unique: true ,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    } ,
    amount: { type: Number, default: 0 },
    currency:{
        type: String,
        enum: ["NGN", "USD"],
      },
    dailyLimit : Number
});

