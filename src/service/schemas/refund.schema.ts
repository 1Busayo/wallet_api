import * as mongoose from 'mongoose';

export const RefundSchema = new mongoose.Schema(
  {

    amount: Number,

    created_at: {
      type: Date,
      default: Date.now
    },
    payment: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payments'
      },
    currency: {
      type: String,
      enum: ["NGN", "USD"],
      default: "NGN"
    },
   

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
