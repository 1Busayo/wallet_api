import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema(
  {

    amount: Number,

    created_at: {
      type: Date,
      default: Date.now
    },

    wallet_to_credit: String,

    currency: {
      type: String,
      enum: ["NGN", "USD"],
      default: "NGN"
    },
    wallet_to_debit: String,

    owner: {

      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },

    ref: String,

    status: {
      type: String,
      enum: ["initiated", "success", "failed"],
      default: "success",
    },

  },

);
